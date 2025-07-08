import { IncomingMessage, ServerResponse } from "http";

export const novaTransacaoController = async (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.write(JSON.stringify({
        resultado: 'novaTransacao'
    }));
    res.end();
}

export const deletarTransacaoController = async (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.write(JSON.stringify({
        resultado: "deletarTransacao"
    }));
    res.end();
}