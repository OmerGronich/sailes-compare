import axios from 'axios';
import { useStepperStore } from 'stores/stepper-store';
interface FundResponse {
  _id: number;
  FUND_ID: string;
  FUND_NAME: string;
  FUND_CLASSIFICATION: string;
  CONTROLLING_CORPORATION: string;
  MANAGING_CORPORATION: string;
  REPORT_PERIOD: string;
  INCEPTION_DATE: string;
  TARGET_POPULATION: string;
  SPECIALIZATION: string;
  SUB_SPECIALIZATION: string;
  DEPOSITS: string;
  WITHDRAWLS: string;
  INTERNAL_TRANSFERS: string;
  NET_MONTHLY_DEPOSITS: string;
  TOTAL_ASSETS: string;
  AVG_ANNUAL_MANAGEMENT_FEE: string;
  AVG_DEPOSIT_FEE: string;
  MONTHLY_YIELD: string;
  YEAR_TO_DATE_YIELD: string;
  YIELD_TRAILING_3_YRS: string;
  YIELD_TRAILING_5_YRS: string;
  AVG_ANNUAL_YIELD_TRAILING_3YRS: string;
  AVG_ANNUAL_YIELD_TRAILING_5YRS: string;
  STANDARD_DEVIATION: string;
  ALPHA: string;
  SHARPE_RATIO: string;
  LIQUID_ASSETS_PERCENT: string;
  STOCK_MARKET_EXPOSURE: string;
  FOREIGN_EXPOSURE: string;
  FOREIGN_CURRENCY_EXPOSURE: string;
  MANAGING_CORPORATION_LEGAL_ID: string;
  CURRENT_DATE: string;
  rank: number;
}
export class ApiService {
  baseUrl: string;
  endpoint: string;
  apiResource: string;
  stepperStore: any;
  constructor() {
    this.baseUrl = 'https://data.gov.il';
    this.endpoint = 'api/3/action/datastore_search';
    this.apiResource = 'a30dcbea-a1d2-482c-ae29-8f781f5025fb';
    this.stepperStore = useStepperStore();
  }

  async handleSearch(companies: string[]) {
    for (const company of companies) {
      const response = await this.getFundsByCompanies(company);
      const data: FundResponse[] = response.data.result.records;
    }
    this.stepperStore.setFunds('data');
  }

  getFundsByCompanies(companies: string) {
    const page = 1;
    const query = `q=${companies}&resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb&offset=${page}00`;
    const url = `${this.baseUrl}/${this.endpoint}?${query}`;
    console.log('url :', url);
    return axios.get(url);
  }
}
