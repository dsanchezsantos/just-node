import { novaTransacaoRepository } from "../repositories/transacoes-repository";
import { StatusCode } from "../utils/StatusCode";

export const novaTransacaoService = async (transacaoParam: string): Promise<StatusCode> => {

    // Converte o texto enviado para JSON
    const transacao = JSON.parse(transacaoParam.toString());

    // Verifica se a transação está de acordo com a interface pre-estabelecida
    const isTipagemTransacaoCorreta = await verificaTipagemTransacao(transacao);

    // Caso não esteja, devolver um alerta como resposta
    if (!isTipagemTransacaoCorreta) {
        return StatusCode.invalidEntity;
    }
    
    // Caso esteja de acordo, envia para o repository do modulo
    return await novaTransacaoRepository(transacao);
}

export const deletarTransacoesService = async () => {
    // Solicita ao repository a deleção dos dados
    return StatusCode.ok;
}

// Verifica se a transação enviada está de acordo com as normas estabelecidas
const verificaTipagemTransacao = async (transacao: any): Promise<boolean> => {

    // Regex para testar o formato do dataHora
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;

    // 1° teste: verifica se trata-se de um objeto
    if(typeof transacao === 'object' && transacao !== null) {
        
        // 2° teste: verifica se tem a quantidade de keys correta
        if (Object.keys(transacao).length === 2 ) {
            
            // 3° teste: verifica se a chave 'valor' existe, possui o tipo correto
            if('valor' in transacao && typeof transacao['valor'] === 'number' && transacao['valor'] >= 0) {
                
                // 4° teste: verifica se a chave 'dataHora' existe e possui o tipo correto
                if('dataHora' in transacao && transacao['dataHora'] && typeof transacao['dataHora'] === 'string' && iso8601Regex.test(transacao['dataHora'])) {
                    // 5° teste: verifica se o valor da chave 'dataHora' está no passado do momento atual do envio
                    let momentoAtual = new Date();
                    let dataHoraEnviado = new Date(transacao['dataHora']);
                    
                    if(dataHoraEnviado <= momentoAtual) {
                        return true;
                    }
                }

            }
            
        }
    }
    return false;
}