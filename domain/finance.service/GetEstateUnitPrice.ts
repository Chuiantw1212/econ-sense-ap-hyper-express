import EstateContractsModel from '../jcic.model'
import type { GetEstateUnitPriceUseCase, IPriceTableItem } from '../../port/in/FinanceUseCases'
interface Idependency {
    model: EstateContractsModel
}

export default class GetEstateUnitPrice implements GetEstateUnitPriceUseCase {
    estateContractsModel: EstateContractsModel = null as any
    constructor(dependency: Idependency) {
        this.estateContractsModel = dependency.model
    }
    async getEstateUnitPrice(query: IPriceTableItem) {
        const result = await this.estateContractsModel.calculateUnitPrice(query)
        return result
    }
}