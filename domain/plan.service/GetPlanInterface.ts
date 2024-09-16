import type { GetPlanInterfaceUseCase } from '../../port/in/MetaUseCases'
import PlanEntity from '../../entities/plan'
class GetPlanInterfaceService implements GetPlanInterfaceUseCase {
    getPlanInterface() {
        const planForm = new PlanEntity()
        return planForm
    }
}
export default new GetPlanInterfaceService()