import { defineStore } from 'pinia';
import { ApiService } from 'src/services/api.service';
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
interface State {
  apiService: ApiService;
  data: Fund[];
}
export const useDataStore = defineStore({
  id: 'dataStore',
  state: (): State => ({
    apiService: new ApiService(),
    data: [],
  }),
  getters: {},
  actions: {
    async handleCompaniesSearch(companies: string[]) {
      const data = await this.apiService.handleCompaniesSearch(companies);
      this.data = data;
    },
  },
});
