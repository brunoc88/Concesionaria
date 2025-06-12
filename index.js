const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send('Hola!')
})

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Escuchando puento:: 3000`)
})