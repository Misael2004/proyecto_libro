import { server } from "./src/server.js";

const PORT = process.env.PORT || 4000

server.listen(PORT, (e) => {
    console.log(`SERVER LISTENER ON http://localhost:${PORT}`);
})