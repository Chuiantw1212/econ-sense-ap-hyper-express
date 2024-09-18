import { JSDOM } from 'jsdom'
import type { IOptionsItem, } from '../entities/select.js'

class IsharesAdapter {
    async fetchCoreSeriesIRR(): Promise<IOptionsItem[]> {
        try {
            const urlMap: { [key: string]: string } = {
                aoa: 'https://www.ishares.com/us/products/239729/ishares-aggressive-allocation-etf',
                aor: 'https://www.ishares.com/us/products/239756/ishares-growth-allocation-etf',
                aom: 'https://www.ishares.com/us/products/239765/ishares-moderate-allocation-etf',
                aok: 'https://www.ishares.com/us/products/239733/ishares-conservative-allocation-etf',
            }
            const coreKeys = Object.keys(urlMap)
            const promiese = coreKeys.map(async key => {
                const crawlResult = await fetch(urlMap[key], {
                    signal: AbortSignal.timeout(150000)
                })
                const pageHtml = await crawlResult.arrayBuffer()
                const dom = new JSDOM(pageHtml)
                const document = dom.window.document
                const tds = document.getElementsByClassName("sinceInceptionAnnualized ")
                const afterTaxPreLiq: HTMLElement = Array.from(tds)[tds.length - 2] as HTMLTableCellElement
                const irrString = String(afterTaxPreLiq.innerHTML).trim()
                const portfolioOption: IOptionsItem = {
                    label: key,
                    value: Number(irrString)
                }
                return portfolioOption
            })
            const portfolioOptions: IOptionsItem[] = await Promise.all(promiese)
            // this.selectModel.replaceByKey('ishareCoreETF', portfolioOptions)
            return portfolioOptions
        } catch (error: any) {
            console.log(`fetchCoreSeriesIRR:`, error.message || error)
            return []
        }
    }
}

export default new IsharesAdapter()