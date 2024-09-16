import CentralBankAdapter from '../../adapters/centralBank.out'
// import SelectModel from '../select.model'
import LifeExpectancyModel from '../lifeExpectancy.model'
import type { GetLifeExpectancyUseCase, ILifeExpectancyItem } from '../../port/in/FinanceUseCases'
interface Idependency {
    adapter: typeof CentralBankAdapter,
    model: LifeExpectancyModel
}
interface INdcLifeExpectancyRawItem {
    '項次': string,
    '西元年': string,
    '民國年': string,
    '性別': string,
    '年齡': string,
    '預期壽命': string
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