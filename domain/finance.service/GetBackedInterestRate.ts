import CentralBankAdapter from '../../adapters/centralBank.out'
import SelectModel from '../Select.model'
import type { GetBackedInterestRateUseCase } from '../../port/in/FinanceUseCases.ts'
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
        const options = await this.selectModel.getOptionsByKey('interestRate')
        if (options.length) {
            return Number(options[0].value)
        } else {
            const interestRate = await this.adapter.crawBackedlInterestRate()
            const newOption = {
                label: 'interestRate',
                value: interestRate
            }
            this.selectModel.replaceByKey('interestRate', [newOption])
            return interestRate
        }
    }
}