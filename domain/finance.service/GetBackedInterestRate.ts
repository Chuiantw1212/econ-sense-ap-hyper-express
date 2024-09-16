import CentralBankAdapter from '../../adapters/centralBank.out'
import type { GetBackedInterestRate } from '../../port/in/FinanceUseCases'
import { SelectModel } from '../select.model'
class GetBackedInterestRateService implements GetBackedInterestRate {
    centralBankAdapter: typeof CentralBankAdapter = null as any
    selectModel: typeof SelectModel = null as any
    initialize(adapter: typeof CentralBankAdapter) {
        this.centralBankAdapter = adapter
    }
    async getBackedInterestRate() {
        // this.adapter.crawBackedlInterestRate
        return 0
    }
}
export default new GetBackedInterestRateService()