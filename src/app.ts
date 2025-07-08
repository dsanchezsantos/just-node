import { IncomingMessage, ServerResponse } from "http";

// Iniciar a aplicação do servidor
export const serverApp = async (request: IncomingMessage, response: ServerResponse) => {

    // Guarda o modulo chamado na url [transacao ou estatistica]
    const url = request.url?.split("/")[1];

    // Verifica o modulo acionado pelo cliente

    // Caso1: Estatística
    if (url === 'estatistica') {

        // Caso o usuario deseje ver as estatisticas
        if (request.method === 'GET') {

            response.writeHead(200, {'content-type': 'application/json'});
            response.write(JSON.stringify({
                resultado: 'estatistica'
            }));
            response.end();
        }

    }

    // Caso2: Transações
    if (url === 'transacao') {

        // Caso o usuario queira adicionar uma nova transacao
        if (request.method === 'POST') {

            response.writeHead(200, {
                'content-type': 'application/json'
            });
            response.write(JSON.stringify({
                resultado: 'novaTransacao'
            }));
            response.end();
        }

        // Caso o usuario queira deletar uma transacao
        if(request.method === 'DELETE') {
            response.writeHead(200, {
                'content-type': 'application/json'
            });
            response.write(JSON.stringify({
                resultado: "deletarTransacao"
            }));
            response.end();
        }
        
    }
}