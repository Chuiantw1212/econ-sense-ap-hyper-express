import HyperExpress from 'hyper-express'
import { memoryUsage } from 'node:process'
import { ILocals } from '../../entities/app.js'
const rootController = new HyperExpress.Router()
rootController.get('/', async (request, response) => {
    const memoryUsageInMB: ReturnType<typeof memoryUsage> = {
        rss: 0,
        heapTotal: 0,
        heapUsed: 0,
        arrayBuffers: 0,
        external: 0,
    }
    const currentMemoryUsage: any = memoryUsage()
    for (const key in memoryUsageInMB) {
        const mb: number = Math.floor(1024 * 1024)
        const value: number = currentMemoryUsage[key]
        const valueInMB: number = Math.floor(value / mb)
        Object.assign(memoryUsageInMB, {
            [key]: `${valueInMB.toLocaleString()}Mb`
        })
    }
    const locals = request.app.locals as ILocals
    response.json({
        memoryUsage: memoryUsageInMB,
        startupTime: `${locals.startupTime}s`,
    })
})
export default rootController