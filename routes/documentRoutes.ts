import express from "express";
import * as documentController from "../controllers/documentController";

const router = express.Router();

router.post("/documents", documentController.createDocument);
router.get("/documents", documentController.getDocuments);
router.get("/documents/:id", documentController.getDocumentById);
router.put("/documents/:id", documentController.updateDocument);
router.delete("/documents/:id", documentController.deleteDocument);

export default router;
