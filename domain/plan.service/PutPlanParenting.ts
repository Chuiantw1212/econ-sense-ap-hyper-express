import PlanModel from "../Plan.model"
import { IPlanParenting } from "../../entities/plan"
export default class PutParentingService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeParenting(uid: string, data: IPlanParenting) {
        const parenting: IPlanParenting = {
            childAnnualExpense: data.childAnnualExpense || 0,
            independantAge: data.independantAge || 0,
            firstBornYear: data.firstBornYear || 0,
            secondBornYear: data.secondBornYear || 0,
            spouseMonthlyContribution: data.spouseMonthlyContribution || 0,
            lifeInsurance: data.lifeInsurance || 0,
        }
        this.planModel.mergeDocField(uid, 'parenting', parenting)
    }
}