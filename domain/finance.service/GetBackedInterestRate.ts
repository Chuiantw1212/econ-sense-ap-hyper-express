import CentralBankAdapter from '../../adapters/centralBank.out'
import SelectModel from '../select.model'
import type { GetBackedInterestRateUseCase } from '../../port/in/FinanceUseCases'
interface Idependency {
    adapter: typeof CentralBankAdapter,
    model: SelectModel
}

export default class GetBackedInterestRateService implements GetBackedInterestRateUseCase {
    adapter: typeof CentralBankAdapter = null as any
    selectModel: SelectModel = null as any
    constructor(dependency: Idependency) {
        this.adapter = dependency.adapter
        this.selectModel = dependency.model
    }
    async getBackedInterestRate() {
        this.adapter.crawBackedlInterestRate()
        return 0
    }
}