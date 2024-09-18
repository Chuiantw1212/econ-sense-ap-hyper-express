import { GetTaiwanLocation } from '../../port/in/MetaUseCases.js'
import LocationModel from '../Location.model.js'
interface Idependency {
    model: LocationModel
}

export default class GetTaiwanLocationService implements GetTaiwanLocation {
    locationModel: LocationModel = null as any
    constructor(dependency: Idependency) {
        const { model } = dependency
        this.locationModel = model
    }
    async getTaiwanLocations() {
        const result = await this.locationModel.getCountiesAndTowns()
        return result
    }
}