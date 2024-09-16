import type { ISelectMap, ISelectDocData } from '../../entities/select'
import type { GetOptionsUseCase } from '../../port/in/MetaUseCases'
import SelectModel from '../select.model'
interface Idependency {
    model: SelectModel
}
export default class GetOptionsService implements GetOptionsUseCase {
    selectModel: SelectModel = null as any
    optionsMap: ISelectMap = {}
    optionKeys: string[] = ['floorSizes', 'buildingAges', 'buildingTypes', 'genders', 'retirementQuartile', 'insuranceTypes']
    constructor(dependency: Idependency) {
        const { model } = dependency
        this.selectModel = model
    }
    async getOptions() {
        // 如有現成就用現成
        const promises = this.optionKeys.map(async (key: string) => {
            let options = this.optionsMap[key]
            if (!options?.length) {
                options = await this.selectModel.getOptionsByKey(key)
                this.optionsMap[key] = options
            }
            const selectDocData: ISelectDocData = {
                key: key,
                options
            }
            return selectDocData
        })
        const docDatas: ISelectDocData[] = await Promise.all(promises)
        const selectMap: ISelectMap = {}
        docDatas.forEach(docData => {
            selectMap[docData.key] = docData.options
        })
        return selectMap
    }
}