import type { GetPlanInterfaceUseCase } from '../../port/in/MetaUseCases.js'
import PlanEntity from '../../entities/plan.js'
export default class GetPlanEntityService implements GetPlanInterfaceUseCase {
    getPlanEntity() {
        const planForm = new PlanEntity()
        return planForm
    }
}