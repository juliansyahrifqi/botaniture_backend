import express from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/user.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const userController = new UserController(new UserService());

router.post('/auth/login', userController.login.bind(userController));
router.get('/user/:id', authenticateJWT, userController.getUserProfile.bind(userController));
router.post('/user/register', userController.registerAccount.bind(userController));
router.put('/user/update/:id', authenticateJWT, userController.updateProfile.bind(userController));
router.put('/user/updatePassword/:id', authenticateJWT, userController.updatePassword.bind(userController));

export default router;