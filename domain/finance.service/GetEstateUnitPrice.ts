import EstateContractsModel from '../EstateContract.model.js'
import LocationModel from '../Location.model.js'
import type { IPriceTableItem } from '../../entities/finance.js'
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
        const queryCountyCode = query.county as string
        if (query.county) {
            query.county = await this.locationModel.getCountyLabel(query.county) // label
            if (query.county && query.town) {
                query.town = await this.locationModel.getTownLabel(queryCountyCode, query.town)
            }
        }
        const result = await this.estateContractsModel.calculateUnitPrice(query)
        return result
    }
}