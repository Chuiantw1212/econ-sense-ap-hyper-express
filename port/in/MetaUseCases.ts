import PlanEntity from '../../entities/plan.js'
import type { ISelectMap, IOptionsItem } from '../../entities/select.js'

export interface GetPlanInterfaceUseCase {
    getPlanEntity: () => PlanEntity
}

export interface GetOptionsUseCase {
    getOptionsMap: () => Promise<ISelectMap>
}

export interface GetTaiwanLocation {
    getTaiwanLocations: () => Promise<{
        counties: IOptionsItem[],
        townMap: ISelectMap,
    }>
}