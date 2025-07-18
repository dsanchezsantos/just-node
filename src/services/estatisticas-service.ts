import { EstatisticaResponseModel } from "../models/estatistica-response-model";
import { TransacaoModel } from "../models/transacao-model";
import { getEstatisticasRepository } from "../repositories/estatisticas.repository";
import { createLogRepository } from "../repositories/logs-repository";
import { HttpMethods } from "../utils/HttpMethods";
import { StatusCode } from "../utils/StatusCode";

export const getEstatisticasService = async (): Promise<EstatisticaResponseModel> => {

    // Variavel de resposta
    let response = null;
    let statusCodeResponse: StatusCode;

    // Tempo de calculo para filtragem das transacoes
    const segundosParaFiltragem: number = process.env.SEGUNDOS_ESTATISTICA ? parseInt(process.env.SEGUNDOS_ESTATISTICA) : 60;

    // Solicita os dados ao repository
    const dataRepository = await getEstatisticasRepository();
    
    // Verifica se algum conteudo valido foi retornado
    if (dataRepository !== 500 && typeof dataRepository === 'string') {

        // Status code para o response
        statusCodeResponse = StatusCode.ok;
        
        // Converte o texto recebido para JSON
        const dataJSON: TransacaoModel[] = JSON.parse(dataRepository);
        
        // Confere se existem transações no último minuto e as armazena
        const transacoesDoUltimoMinuto: TransacaoModel[] = dataJSON.filter((transacao) => {
            
            // Seleciona o momento atual
            const agora = Date.now();
            
            // Desconta um minuto do momento atual
            const agoraMenosUmMinuto = agora - (segundosParaFiltragem * 1000);
            
            // Converte o dataHora da transacao para o formato de comparação (timestamp)
            const dataHoraTimestamp = new Date(transacao.dataHora).getTime();
            
            return dataHoraTimestamp >= agoraMenosUmMinuto && dataHoraTimestamp <= agora;
        });
        
        // Verifica se realmente existem transações no ultimo minuto
        if (transacoesDoUltimoMinuto.length !== 0) {

            // Manipula as informações das transações para gerar as estatísticas
            
            // Quantidade de transações
            const count = dataJSON.length;
            
            // Soma dos valores
            const sum = dataJSON.reduce((acumulador, transacao) => acumulador + transacao.valor, 0);
            
            // Média dos valores
            const avg = sum/count;
    
            // Menor valor
            const min = dataJSON.reduce((menor, atual) => {return atual.valor < menor.valor ? atual : menor}).valor;
    
            //Maior valor
            const max = dataJSON.reduce((maior, atual) => {return atual.valor > maior.valor ? atual : maior;}).valor;
            
            // Manipula a resposta
            response = {
                statusCode: statusCodeResponse,
                estatisticas: {
                    count: count,
                    sum: sum,
                    avg: avg,
                    min: min,
                    max: max
                }
            };

            // Registra o log
            createLogRepository({
                modulo: 'estatistica',
                statusCode: statusCodeResponse,
                metodo: HttpMethods.GET,
                data: null
            })
            
            // Retorna para o cliente
            return response;
            
        } else {

            // StatusCode para o response
            statusCodeResponse = StatusCode.ok;

            // Manipula a resposta
            response = {
                statusCode: statusCodeResponse,
                estatisticas: {
                    count: 0,
                    sum: 0,
                    avg: 0,
                    min: 0,
                    max: 0
                }
            };

            // Registra o log
            createLogRepository({
                modulo: 'estatistica',
                statusCode: statusCodeResponse,
                metodo: HttpMethods.GET,
                data: null
            })

            // Retorna para o cliente
            return response;

        }


    } else {

        return {
            statusCode: StatusCode.error,
            estatisticas: null
        }

    }

}