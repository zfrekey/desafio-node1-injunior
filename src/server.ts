import { app } from "@/app"

const porta = 3333

app.listen({
    host: '0.0.0.0',  
    port: porta
})
.then(() => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
}) 