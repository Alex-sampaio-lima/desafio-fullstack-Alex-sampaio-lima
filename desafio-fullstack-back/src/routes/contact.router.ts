import { Router } from "express";
import { createContactController, deleteContactController, readContactByIdController, readContactController, updateContactController } from "../controllers/contact.controllers";
import { verifyIdClientExists } from "../middlewares/verifyIdClientExists.middleware";
import { verifyIdExistsContact } from "../middlewares/verifyIdContactExists.middleware";
import { verifyIfEmailExist } from "../middlewares/verifyIfEmailExist.middleware";
import { vefiryIfTelIsValid } from "../middlewares/vefiryIfTelIsValid.middleware";
import { verifyAdmin, verifyContactPermission, verifyPermission, verifyToken } from "../middlewares/globals.middleware";
import { validateBody } from "../middlewares/validatedBody.middleware";
import { contactUpdateSchema } from "../schemas/contact.schemas";


export const contactRouter: Router = Router();

contactRouter.get("/", verifyToken, verifyAdmin, readContactController)
contactRouter.get("/:contactId", verifyToken, verifyPermission, readContactByIdController)

contactRouter.post("/:clientId", verifyToken, verifyPermission, vefiryIfTelIsValid, verifyIdClientExists, verifyIfEmailExist, createContactController)

contactRouter.use("/:contactId", verifyIfEmailExist)

contactRouter.patch("/:contactId", verifyToken, verifyIdExistsContact, verifyContactPermission, vefiryIfTelIsValid, updateContactController)
contactRouter.delete("/:contactId", verifyToken, verifyIdExistsContact, verifyContactPermission, deleteContactController)
