import { IncomingMessage, ServerResponse } from "http";
import { getEstatisticasService } from "../services/estatisticas-service";
import { EstatisticaResponseModel } from "../models/estatistica-response-model";

export const getEstatisticasController = async (req: IncomingMessage, res: ServerResponse) => {

    // Solicita o serviço para buscar os dados e retornar as estatisticas
    const response: EstatisticaResponseModel = await getEstatisticasService();

    // Retorna o response para o cliente
    res.writeHead(response.statusCode, {'content-type': 'application/json'});
    res.write(JSON.stringify(response.estatisticas));
    res.end();
}