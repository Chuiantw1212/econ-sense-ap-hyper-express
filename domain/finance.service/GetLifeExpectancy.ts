import LifeExpectancyModel from '../LifeExpectancy.model'
import type { GetLifeExpectancyUseCase, ILifeExpectancyItem } from '../../port/in/FinanceUseCases.tsa'
interface Idependency {
    model: LifeExpectancyModel
}

export default class GetLifeExpectancyService implements GetLifeExpectancyUseCase {
    lifeExpectancyModel: LifeExpectancyModel = null as any
    constructor(dependency: Idependency) {
        this.lifeExpectancyModel = dependency.model
    }
    async getLifeExpectancy(query: ILifeExpectancyItem): Promise<number> {
        const lifeExpectancy = await this.lifeExpectancyModel.queryLifeExpectancy(query)
        return lifeExpectancy
    }
}