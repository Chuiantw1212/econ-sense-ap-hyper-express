import EstateContractsModel from '../EstateContract.model'
import LocationModel from '../Location.model'
import type { GetEstateUnitPriceUseCase, IPriceTableItem } from '../../port/in/FinanceUseCases'
interface Idependency {
    estateContractsModel: EstateContractsModel,
    locationModel: LocationModel
}

export default class GetEstateUnitPriceService implements GetEstateUnitPriceUseCase {
    estateContractsModel: EstateContractsModel = null as any
    locationModel: LocationModel = null as any
    constructor(dependency: Idependency) {
        this.estateContractsModel = dependency.estateContractsModel
        this.locationModel = dependency.locationModel
    }
    async getEstateUnitPrice(query: IPriceTableItem) {
        if (query.county) {
            query.county = this.locationModel.getCountyLabel(query.county)
            if (query.county && query.town) {
                query.town = this.locationModel.getTownLabel(query.county, query.town)
            }
        }
        const result = await this.estateContractsModel.calculateUnitPrice(query)
        return result
    }
}