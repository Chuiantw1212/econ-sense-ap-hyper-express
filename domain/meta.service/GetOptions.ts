import type { GetOptionsUseCase } from '../../port/in/MetaUseCases'
// import PlanEntity from '../../entities/plan'
class GetOptionsService implements GetOptionsUseCase {
    constructor() {

    }
    getOptions() {
        // // 驗證業務規則，與驗證輸入資料不相同
        // // 操作模型(model)狀態
        // const planForm = new PlanEntity()
        // // 回傳
        // return planForm
    }
}
export default new GetOptionsService()