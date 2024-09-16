import { GetEstateContractPort } from '../port/out/CrawlerPorts'
class JcicAdapter implements GetEstateContractPort {
    async getContractPriceTable() {
        let resultData = []
        try {
            resultData = require('./ContractPrice_TABLE_C_2023')
            if (!resultData?.length) {
                const result = await fetch('https://www.jcic.org.tw/openapi/api/ContractPriceTableC2023', {
                    signal: AbortSignal.timeout(300)
                })
                const resultJson = await result.json()
                resultData = resultJson
            }
        } catch (error: any) {
            console.log(`getContractPriceTable`, error.message || error)
            throw error
        }
        return resultData
    }
}

export default new JcicAdapter()