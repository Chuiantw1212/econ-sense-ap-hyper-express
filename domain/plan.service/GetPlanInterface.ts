import type { GetPlanInterfaceUseCase } from '../../port/in/MetaUseCases'
import PlanEntity from '../../entities/plan'
export default class GetPlanInterfaceService implements GetPlanInterfaceUseCase {
    getPlanInterface() {
        const planForm = new PlanEntity()
        return planForm
    }
}