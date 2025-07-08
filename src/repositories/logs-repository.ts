import { LogModel, LogRequestModel } from "../models/log-model";
import fs from "fs/promises";

export const createLogRepository = async (log: LogRequestModel) => {
    // Caminho para o arquivo
    const path = './src/data/logs.json';

    try {

        // Manipulação do objeto do Log
        const logJSON: LogModel = {
            dataHoraLog: Date.now(),
            log: log
        }
        
        // Armazena o log no arquivo
        await fs.writeFile(path, JSON.stringify(logJSON), "utf-8");

    } catch (error) {

        // Caso encontre algum erro, printa o erro no terminal
        console.log(error);
    }
}