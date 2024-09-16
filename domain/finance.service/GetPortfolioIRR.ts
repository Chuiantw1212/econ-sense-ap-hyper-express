import ISharesAdapter from '../../adapters/ishares.out'
import SelectModel from '../select.model'
import type { GetPortfolioIRRUseCase } from '../../port/in/FinanceUseCases'
interface Idependency {
    adapter: typeof ISharesAdapter,
    model: SelectModel
}

export default class GetPortfolioIRRService implements GetPortfolioIRRUseCase {
    adapter: typeof ISharesAdapter = null as any
    selectModel: SelectModel = null as any
    constructor(dependency: Idependency) {
        this.adapter = dependency.adapter
        this.selectModel = dependency.model
    }
    async getPortfolioIRR() {
        let options = await this.selectModel.getOptionsByKey('ishareCoreETF')
        if (options?.length) {
            return options
        } else {
            options = await this.adapter.fetchCoreSeriesIRR()
            this.selectModel.replaceByKey('ishareCoreETF', options)
            return options
        }
    }
}