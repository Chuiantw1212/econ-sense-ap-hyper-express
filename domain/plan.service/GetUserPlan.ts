import PlanModel from "../Plan.model.js"
import { IPlanDoc } from "../../entities/plan.js"
export default class GetUserPlanService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async getPlan(uid: string): Promise<IPlanDoc> {
        const plan = await this.planModel.getPlan(uid)
        return plan
    }
}