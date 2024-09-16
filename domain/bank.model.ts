import { JSDOM } from 'jsdom'
import type { IOptionsItem, } from '../entities/select'
import SelectModel from './select.model'
export default class BankModel {
    selectModel: SelectModel = null as any
    constructor(payload: any) {
        this.selectModel = payload.selectModel
    }
    async getInterestRate(): Promise<number> {
        const interestRateOptions: IOptionsItem[] = await this.getConfigByKey('interestRate')
        const interestRate = interestRateOptions[0].value
        return Number(interestRate)
    }
    async getConfigByKey(key: string): Promise<IOptionsItem[]> {
        const options = await this.selectModel.getOptionsByKey(key)
        if (options.length) {
            return options
        } else {
            switch (key) {
                case 'ishareCoreETF': {
                    return await this.fetchCoreSeriesIRR()

                }
                case 'interestRate': {
                    return await this.fetchInterestRate()
                }
            }
            return []
        }
    }
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
            this.selectModel.replaceByKey('ishareCoreETF', portfolioOptions)
            return portfolioOptions
        } catch (error: any) {
            console.log(`fetchCoreSeriesIRR:`, error.message || error)
            return []
        }
    }
    async fetchInterestRate(): Promise<IOptionsItem[]> {
        try {
            const result = await fetch('https://cpx.cbc.gov.tw/api/OpenData/OAS?set_id=6022', {
                signal: AbortSignal.timeout(15000)
            })
            const resultJson = await result.json()
            const data: string = resultJson.paths['/api/OpenData/DataSet'].get.responses['200'].content['application/json'].example.Data.value
            const labelAndValues: string[] = data.split(',')
            const keys = ['調整日期', '重貼現率', '擔保放款融通利率', '短期融通利率']
            const interestRateMap: {
                [key: string]: number
            } = {}
            let estateInterestRate = 0
            labelAndValues.forEach((item, index) => {
                const label = keys[index]
                const value = item.replace(`${label}:`, '').replaceAll("'", '')
                interestRateMap[label] = Number(value)
                if (index === 2 && !Number.isNaN(Number(value))) {
                    estateInterestRate = Number(value)
                }
            })
            if (!estateInterestRate) {
                estateInterestRate = await this.crawlInterestRateFromCbc()
            }
            // set options
            const options: IOptionsItem[] = []
            if (estateInterestRate) {
                options.push({
                    label: 'interestRate',
                    value: estateInterestRate
                })
                this.selectModel.replaceByKey('interestRate', options)
            }
            return options
        } catch (error: any) {
            console.log(`fetchInterestRate`, error.message || error)
            throw error
        }
    }
    async crawlInterestRateFromCbc(): Promise<number> {
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