import PlanModel from "../Plan.model.js"
import { IPlan } from "../../entities/plan.js"
export default class GetUserPlanService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async getPlan(uid: string): Promise<IPlan> {
        const plan = await this.planModel.getPlan(uid)
        return plan
    }
}