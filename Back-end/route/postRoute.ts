import { postController } from '../controllers/postControl'
import express from 'express';
import bodyParser from 'body-parser';


const initpostRoute = () => {
    const postrouter = express.Router();
    postrouter.use(bodyParser.json());
    const controll = postController();
    postrouter.use(bodyParser.urlencoded({ extended: true }));


    postrouter.post('/postItem', controll.createPost);
    postrouter.get('/getPosts', controll.getPosts);
    return  postrouter ;
}


export  { initpostRoute };
