import { IncomingMessage, ServerResponse } from "http";
import { novaTransacaoService, deletarTransacoesService } from "../services/transacoes-services";
import { StatusCode } from "../utils/StatusCode";

export const novaTransacaoController = async (req: IncomingMessage, res: ServerResponse) => {

    // Recupera a transação enviada pela requisição
    req.on('data', async (transacao) => {

        // Enviar os dados para o services
        const responseStatusCode: StatusCode = await novaTransacaoService(transacao);

        // Devolver a resposta para o servidor
        res.writeHead(responseStatusCode);
        res.end();
    });

}

export const deletarTransacoesController = async (req: IncomingMessage, res: ServerResponse) => {
    
    // Solicita ao service que organize o fluxo deleção dos dados
    let responseStatusCode: StatusCode = await deletarTransacoesService();

    // Devolver a resposta para o servidor
    res.writeHead(responseStatusCode);
    res.end();

}