import type { GetPlanInterfaceUseCase } from '../../entities/meta.js'
import PlanEntity from '../../entities/plan.js'
export default class GetPlanEntityService implements GetPlanInterfaceUseCase {
    getPlanEntity() {
        const planForm = new PlanEntity()
        return planForm
    }
}