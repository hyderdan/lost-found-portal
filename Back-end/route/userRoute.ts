import { userController } from '../controllers/usercontroller'
import express from 'express';
import bodyParser from 'body-parser';


const initUserRoute = () => {
    const userRouter = express.Router();
    const controll = userController();
    userRouter.use(bodyParser.json());
    userRouter.use(bodyParser.urlencoded({ extended: true }));

    userRouter.post('/signUp', controll.registerUser);


    return userRouter;
}



export { initUserRoute };