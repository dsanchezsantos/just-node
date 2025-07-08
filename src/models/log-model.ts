import { HttpMethods } from "../utils/HttpMethods";
import { StatusCode } from "../utils/StatusCode";
import { TransacaoModel } from "./transacao-model";

export interface LogRequestModel {
    /*
        - Se for uma nova transação:
        modulo: transacao
        metodo: POST
        statuscode: 201 | 422 | 400
        data: TransacaoModel
    
        - Se for pra deletar as transações
        modulo: transacao
        metodo: DELETE
        statusCode: 200
        data: null
    
        - Se for pra gerar as estatisticas
        modulo: estatistica
        metodo: GET
        statusCode: 200
        data: null
    */
        
    modulo: string;
    metodo: HttpMethods;
    statusCode: StatusCode;
    data: TransacaoModel | null;
}

export interface LogModel {
    dataHoraLog: number;
    log: LogRequestModel;
}
