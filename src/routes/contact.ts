import express from "express";
import { ContactController } from "../controllers/ContactController";
import { ContactService } from "../services/contact.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const contactController = new ContactController(new ContactService());

/**
 * @swagger
 * components:
 *  schemas:
 *     Contact:
 *      type: object
 *      properties:
 *          contact_id:
 *              type: integer
 *              description: Contact ID
 *          contact_name:
 *              type: string
 *              description: Contact Name (ex. Whatsapp, Instagram, etc)
 *          contact_account:
 *              type: string
 *              description: Contact Account (ex. 085123 or @botaniture.id)
 *          contact_link:
 *              type: string
 *              description: Link to Contact (ex. Link to Instagram Account)
 *          contact_image:
 *              type: File
 *              description: Icon for Contact Account
 *     example:
 *          contact_id: 1
 *          contact_name: Instagram
 *          contact_account: '@botaniture.id'
 *          contact_link: https://www.instagram.com/botaniture.id
 *          contact_image: 12379812.svg
 *          type: Instagram
 */

/**
 * @swagger
 * /contact:
 *  get:
 *     summary: Get all contact
 *     description: Get all contact
 *     responses:
 *      200:
 *         description: List of Contact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 statusCode:
 *                   type: integer
 *                   description: Return status code from server
 *                   example: 200 
 *                 message: 
 *                   type: string
 *                   description: Message from server
 *                   example: Contact Found 
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contact_id: 
 *                         type: integer
 *                         description: Contact ID
 *                         example: 1
 *                       contact_name:
 *                         type: string
 *                         description: Name of Contact
 *                         example: Instagram
 *                       contact_account:
 *                         type: string
 *                         description: Name Account of Contact 
 *                         example: '@botaniture.id'
 *                       contact_link:
 *                         type: string
 *                         description: Link to Contact
 *                         example: 'https://www.instagram.com/botaniture.id'
 *                       contact_image:
 *                         type: string
 *                         description: Icon for Contact
 *                         example: 1684207244434.png
 *      404:
 *         description: List contact is empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 statusCode:
 *                   type: integer
 *                   description: Return status code from server
 *                   example: 404 
 *                 message: 
 *                   type: string
 *                   description: Message from server
 *                   example: Contact Not Found 
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/contact', contactController.getAllContact.bind(contactController));

/**
 * @swagger
 * /contact:
 *  post:
 *      summary: Create New Contact
 *      description: Create New Contact
 *      requestBody:
 *          description: A JSON object containing contact information
 *          content:
 *             application/json:
 *                 schema:
 *                    type: object
 *                    properties:
 *                      contact_name: 
 *                        type: string
 *                      contact_account:
 *                        type: string
 *                      contact_link:
 *                        type: string
 *                      contact_image:
 *                        type: string
 *                        format: binary
 *                 example:
 *                    contact_name: Instagram
 *                    contact_account: '@botaniture.id'
 *                    contact_link: https://www.instagram.com/botaniture.id
 *                    contact_image: 123789312.jpg
 *      responses:
 *        200:
 *          description: Success
 *        500:
 *          description: Internal Server Error
 */
router.post('/contact', authenticateJWT, contactController.createContact.bind(contactController));
// router.put('/contact/:id', authenticateJWT, contactController.updateContact.bind(contactController));
// router.delete('/contact/:id', authenticateJWT, contactController.deleteContact.bind(contactController));

export default router;
