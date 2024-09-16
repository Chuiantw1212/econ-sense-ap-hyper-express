import CentralBankAdapter from '../../adapters/centralBank.out'
import LifeExpectancyModel from '../lifeExpectancy.model'
import type { GetLifeExpectancyUseCase, ILifeExpectancyItem } from '../../port/in/FinanceUseCases'
interface Idependency {
    adapter: typeof CentralBankAdapter,
    model: LifeExpectancyModel
}

export default class GetLifeExpectancyService implements GetLifeExpectancyUseCase {
    adapter: typeof CentralBankAdapter = null as any
    lifeExpectancyModel: LifeExpectancyModel = null as any
    constructor(dependency: Idependency) {
        this.adapter = dependency.adapter
        this.lifeExpectancyModel = dependency.model
    }
    async getLifeExpectancy(query: ILifeExpectancyItem): Promise<number> {
        const lifeExpectancy = await this.lifeExpectancyModel.queryLifeExpectancy(query)
        return lifeExpectancy
    }
}