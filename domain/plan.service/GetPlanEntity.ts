import type { GetPlanInterfaceUseCase } from '../../port/in/MetaUseCases'
import PlanEntity from '../../entities/plan'
export default class GetPlanEntityService implements GetPlanInterfaceUseCase {
    getPlanEntity() {
        const planForm = new PlanEntity()
        return planForm
    }
}