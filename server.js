import express from 'express';
import cors from 'cors';
import router  from './routes/router.js';

const app = express();
app.use('/', express.static("public"));
app.use(express.json());
app.use(cors());
app.use(router)

app.get('/testing',(req,res) => {
    res.send("Hey it's working!")
})

app.listen(443, () => {
    console.log('Server is running!')
})
