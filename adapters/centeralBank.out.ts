import { JSDOM } from 'jsdom'
import { CrawInterestRatePort } from '../port/out/CrawlerPorts'

class CentralBankAdapter implements CrawInterestRatePort {
    async crawlInterestRate(): Promise<number> {
        try {
            const result = await fetch('https://www.cbc.gov.tw/tw/lp-370-1.html', {
                signal: AbortSignal.timeout(300)
            })
            const resultbuffer = await result.arrayBuffer()
            const dom = new JSDOM(resultbuffer)
            const document = dom.window.document
            const tds = document.getElementsByTagName('td')
            const filteredItems: any[] = Array.from(tds).filter((item: any) => {
                return item.dataset.th === '擔保放款融通利率'
            })
            const mostRecentItem: HTMLElement = filteredItems[0]
            const interestRate = mostRecentItem.innerHTML.replaceAll(/(<[^>]*>|\n)/g, '')
            if (!Number.isNaN(Number(interestRate))) {
                return Number(interestRate)
            }
        } catch (error: any) {
            console.log(`crawlInterestRateFromCbc:`, error.message || error)
            throw error
        }
        return 0
    }
}

export default new CentralBankAdapter()