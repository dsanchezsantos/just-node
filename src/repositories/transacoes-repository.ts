import { TransacaoModel } from "../models/transacao-model"
import { StatusCode } from "../utils/StatusCode"
import fs from "fs/promises";

export const novaTransacaoRepository = async (transacao: TransacaoModel): Promise<StatusCode> => {

    // Caminho do arquivo de transações
    const caminho = './src/data/transactions.json';

    // Realizar a tratativa de erro
    try {
        // Ler o array de JSON do arquivo
        const jsonFile = await fs.readFile(caminho, {encoding: 'utf-8'});

        let data;

        // Testa se o arquivo está vazio
        if (!jsonFile) {

            data = [];
            data.push(transacao);

        } else {

            // Converter o conteudo para um objeto JS
            data = JSON.parse(jsonFile);
            // Manipular o conteudo para adicionar o novo
            data.push(transacao);

        }

        // Escrever de volta no arquivo, sobrescrevendo o antigo
        await fs.writeFile(caminho, JSON.stringify(data), 'utf-8');

        // Retorna sucesso se chegar até aqui
        return StatusCode.created;

    } catch (error) {

        // Retorna o código de erro pré-estabelecido
        console.log(error);
        return StatusCode.badRequest;

    }
}

export const deletarTrancascoesRepository = async (): Promise<StatusCode> => {
    // Caminho do arquivo de transações
    const path = './src/data/transactions.json';

    // Limpar o arquivo com texto vazio
    await fs.writeFile(path, '', 'utf-8');

    // Retorna o StatusCode de sucesso
    return StatusCode.ok;

}