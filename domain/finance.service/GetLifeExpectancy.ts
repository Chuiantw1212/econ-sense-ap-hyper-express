import LifeExpectancyModel from '../LifeExpectancy.model.js'
import type { ILifeExpectancyItem } from '../../port/in/FinanceUseCases.js'
interface Idependency {
    model: LifeExpectancyModel
}

export default class GetLifeExpectancyService {
    lifeExpectancyModel: LifeExpectancyModel = null as any
    constructor(dependency: Idependency) {
        this.lifeExpectancyModel = dependency.model
    }
    async getLifeExpectancy(query: ILifeExpectancyItem): Promise<number> {
        const lifeExpectancy = await this.lifeExpectancyModel.queryLifeExpectancy(query)
        return lifeExpectancy
    }
}