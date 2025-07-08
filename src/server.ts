import * as http from "http";
import { serverApp } from "./app";

const server = http.createServer(serverApp);

server.listen(process.env.PORT, () => {
    console.log("Server is on fire 🔥🏹");
})