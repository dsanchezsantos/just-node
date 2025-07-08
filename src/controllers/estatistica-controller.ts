import { IncomingMessage, ServerResponse } from "http";

export const getEstatisticasController = async (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify({
        resultado: 'estatistica'
    }));
    res.end();
}