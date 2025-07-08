import fs from "fs/promises";
import { StatusCode } from "../utils/StatusCode";

export const getEstatisticasRepository = async (): Promise<string | StatusCode> => {

    try {

        // Le o conteudo do arquivo
        const data = await fs.readFile('./src/data/transactions.json', 'utf-8');
        
        // Retorna o conteudo do arquivo para a service
        return data;
    } catch (error) {

        console.log(error);
        // Retorna o erro para o usuario
        return StatusCode.error;
    }
    

}