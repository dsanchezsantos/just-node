import { LogModel, LogRequestModel } from "../models/log-model";
import fs from "fs/promises";

export const createLogRepository = async (log: LogRequestModel) => {
    // Caminho para o arquivo
    const path = './src/data/logs.json';

    // Vetor de logs
    let logs = [];

    // Manipulação do objeto do Log
    const logJSON: LogModel = {
        dataHoraLog: Date.now(),
        log: log
    }

    try {
        // Verifica se o arquivo de log já possui registros:
        const jsonFile = await fs.readFile(path, 'utf-8');
    
        if (!jsonFile) {
            logs.push(logJSON);
        } else {
            const logsData = JSON.parse(jsonFile);
            logs = [...logsData, logJSON];
        }

        // Armazena o log no arquivo
        await fs.writeFile(path, JSON.stringify(logs), "utf-8");

    } catch (error) {

        // Caso encontre algum erro, printa o erro no terminal
        console.log(error);
    }
}