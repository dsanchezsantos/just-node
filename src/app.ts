import { IncomingMessage, ServerResponse } from "http";

import { Routes } from "./routes/routes";
import { HttpMethods } from "./utils/HttpMethods";

import * as TransacoesController from "./controllers/transacoes-controller";
import * as EstatisticasController from "./controllers/estatistica-controller";

// Iniciar a aplicação do servidor
export const serverApp = async (request: IncomingMessage, response: ServerResponse) => {

    // Guarda o modulo chamado na url [transacao ou estatistica]
    const url = request.url?.split("/")[1];

    // Verifica o modulo acionado pelo cliente

    // Caso 1: Estatística
    if (url === Routes.ESTATISTICA) {

        // Caso o usuario deseje ver as estatisticas
        if (request.method === HttpMethods.GET) {
            await EstatisticasController.getEstatisticasController(request, response);
        }

    }

    // Caso 2: Transações
    if (url === Routes.TRANSACAO) {

        // Caso o usuario queira adicionar uma nova transacao
        if (request.method === HttpMethods.POST) {
            await TransacoesController.novaTransacaoController(request, response);
        }

        // Caso o usuario queira deletar uma transacao
        if(request.method === HttpMethods.DELETE) {
            await TransacoesController.deletarTransacoesController(request, response);
        }
        
    }
}