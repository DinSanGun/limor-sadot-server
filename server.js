import express from 'express';
import cors from 'cors';
import router  from './routes/router.js';

const app = express();
app.use('/', express.static("public"));
app.use(express.json());
app.use(cors({  origin: 'http://localhost:3000'    }));
app.use(router)

app.get('/testing',(req,res) => {
    console.log("It's working in console!")
    alert("Hey it's working!")
})

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running!')
})
