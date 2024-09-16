import PlanModel from "../Plan.model"
import { IPlanSecurity } from "../../entities/plan"
export default class PutSecurityService {
    planModel: PlanModel = null as any
    constructor(model: PlanModel) {
        this.planModel = model
    }
    async mergeSecurity(uid: string, data: IPlanSecurity) {
        const security: IPlanSecurity = {
            allocationETF: data.allocationETF || '',
            presentAsset: data.presentAsset || 0,
        }
        this.planModel.mergeDocField(uid, 'retirement', security)
    }
}