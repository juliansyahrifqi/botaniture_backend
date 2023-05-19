import express from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/user.service";

const router = express.Router();

const userController = new UserController(new UserService());

router.get('/user/:id', userController.getUserProfile.bind(userController));
router.post('/user/register', userController.registerAccount.bind(userController));
router.put('/user/update/:id', userController.updateProfile.bind(userController));
router.put('/user/updatePassword/:id', userController.updatePassword.bind(userController));

export default router;