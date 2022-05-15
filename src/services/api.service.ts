import axios from 'axios';
import { useStepperStore } from 'stores/stepper-store';
interface FundResponse {
  company?: string;
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
interface Fund {
  name: string;
  avgAnnnualManagmentFee: string;
  avgAnnualYield3Years: string;
  avgAnnualYield5Years: string;
  controlledBy: string;
  forgeinCurrencyExposure: string;
  forgeinExposure: string;
  id: string;
  inceptionAt: string;
  manageBy: string;
  thisMonthYield: string;
  stockExposure: string;
  target: string;
  totalAssets: string;
  yearToDateYield: string;
  past3YearsYield: string;
  past5YearsYield: string;
  desposits: string;
  withdrawls: string;
  thisMonthDesposits: string;
  standardDeviation: string;
  alpha: string;
  sharpeRatio: string;
  company: string;
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

  async handleCompaniesSearch(companies: string[]) {
    const results = [];
    for (const company of companies) {
      let response;
      try {
        response = await this.getFundsByCompanies(company);
      } catch (e: any) {
        console.log('e :', e.message);
      }
      const data: FundResponse[] = response?.data?.result?.records || [];
      const dataWithCompany = data?.map((fund) => ({ ...fund, company })) || [];
      results.push(...dataWithCompany);
    }
    return this.parseResponseData(results);
  }

  parseResponseData(responseData: FundResponse[]): Fund[] {
    return responseData.map((item) => {
      return {
        name: item.FUND_NAME,
        avgAnnnualManagmentFee: item.AVG_ANNUAL_MANAGEMENT_FEE,
        avgAnnualYield3Years: item.AVG_ANNUAL_YIELD_TRAILING_3YRS,
        avgAnnualYield5Years: item.AVG_ANNUAL_YIELD_TRAILING_5YRS,
        controlledBy: item.CONTROLLING_CORPORATION,
        forgeinCurrencyExposure: item.FOREIGN_CURRENCY_EXPOSURE,
        forgeinExposure: item.FOREIGN_EXPOSURE,
        id: item.FUND_ID,
        inceptionAt: item.INCEPTION_DATE,
        manageBy: item.MANAGING_CORPORATION,
        thisMonthYield: item.MONTHLY_YIELD,
        stockExposure: item.STOCK_MARKET_EXPOSURE,
        target: item.TARGET_POPULATION,
        totalAssets: item.TOTAL_ASSETS,
        yearToDateYield: item.YEAR_TO_DATE_YIELD,
        past3YearsYield: item.YIELD_TRAILING_3_YRS,
        past5YearsYield: item.YIELD_TRAILING_5_YRS,
        desposits: item.DEPOSITS,
        withdrawls: item.WITHDRAWLS,
        thisMonthDesposits: item.NET_MONTHLY_DEPOSITS,
        standardDeviation: item.STANDARD_DEVIATION,
        alpha: item.ALPHA,
        sharpeRatio: item.SHARPE_RATIO,
        company: item.company || '',
      };
    }); // TODO: parse that shit
  }

  async getFundsByCompanies(companies: string) {
    let page = 0;
    let isNextPage = true;
    const query = `q=${companies}&resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb&offset=${page}00`;
    const url = `${this.baseUrl}/${this.endpoint}?${query}`;
    const response = await axios.get(url);
    const records = response.data?.result?.records;
    while (isNextPage) {
      page++;
    }
    return response;
  }
}
