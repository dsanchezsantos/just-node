import { StatusCode } from "../utils/StatusCode";

export const novaTransacaoService = async (novaTransacao: any): Promise<StatusCode> => {
    // Verifica se a transação está de acordo com a interface pre-estabelecida
    const isTipagemTransacaoCorreta = await verificaTipagemTransacao(novaTransacao);

    // Caso não esteja, devolver um alerta como resposta
    if (!isTipagemTransacaoCorreta) {
        return StatusCode.invalidEntity;
    }
    
    // Caso esteja de acordo, envia para o repository do modulo
    return StatusCode.ok;
}

export const deletarTransacoesService = async () => {
    // Solicita ao repository a deleção dos dados
    return StatusCode.ok;
}

// Verifica se a transação enviada está de acordo com as normas estabelecidas
const verificaTipagemTransacao = async (transacao: any): Promise<boolean> => {
    // 1° teste: verifica se trata-se de um objeto
    if(typeof transacao === 'object' && transacao !== null) {
        
        // 2° teste: verifica se tem a quantidade de keys correta
        if (Object.keys(transacao).length === 2 ) {
            
            // 3° teste: verifica se a chave 'valor' existe, possui o tipo correto
            if('valor' in transacao && typeof transacao['valor'] === 'number' && transacao['valor'] >= 0) {
                
                // 4° teste: verifica se a chave 'dataHora' existe e possui o tipo correto
                if('dataHora' in transacao && transacao['dataHora'] && typeof transacao['dataHora'] === 'string') {
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