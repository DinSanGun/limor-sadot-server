import express from 'express';
import cors from 'cors';
import https from 'https';
import path from 'path';
import fs from 'fs';
import router  from './routes/router.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const app = express();
app.use('/', express.static("public"));
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(router);
const port = 443;
// const validationFilePath = '/.well-known/pki-validation/5B5B1A2F9211E2759DD26D5E97AA1C04.txt'

app.get('/', (req,res) => {
    res.send('Hello from SSL Server!')
})

app.get('/testing',(req,res) => {
    res.send("Hey it's working!")
})

// app.get(validationFilePath, (req,res) => {
//     res.sendFile(dirname + validationFilePath);
// })

const options = {
    key: fs.readFileSync(dirname + '/cert/limorsadot.link_key.key'),
    cert: fs.readFileSync(dirname + '/cert/limorsadot.link.crt'),
    ca: fs.readFileSync(dirname + '/cert/limorsadot.link.ca-bundle')
}

const sslServer = https.createServer(options, app)

sslServer.listen(port, () => {
    console.log('Secure server is up on port ' + port)
})

// app.listen(port, () => {
//     console.log('Server is running on port ' + port)
//     console.log(dirname)
// })
