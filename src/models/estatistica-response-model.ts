import { StatusCode } from "../utils/StatusCode"

export interface EstatisticaResponseModel {
    statusCode: StatusCode
    estatisticas: EstatisticasModel | null
}

export interface EstatisticasModel {
    count: number
    sum: number
    avg: number
    min: number
    max: number
}