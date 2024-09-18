import EstateContractsModel from '../EstateContract.model.js'
import LocationModel from '../Location.model.js'
import type { IPriceTableItem } from '../../port/in/FinanceUseCases.js'
interface Idependency {
    estateContractsModel: EstateContractsModel,
    locationModel: LocationModel
}

export default class GetEstateUnitPriceService {
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