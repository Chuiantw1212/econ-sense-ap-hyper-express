import PlanModel from "../Plan.model.js"
import { IPlan } from "../../entities/plan.js"
export default class PostNewPlanService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async addNewPlan(uid: string, data: IPlan) {
        const plan = await this.planModel.addNewPlan(uid, data)
        return plan
    }
}