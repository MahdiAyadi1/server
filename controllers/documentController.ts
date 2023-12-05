import { Request, Response } from "express";
import Document, { DocumentType } from "../models/document";

export const createDocument = async (req: Request, res: Response) => {
  try {
    const { name, type, description } = req.body;
    if (!Object.values(DocumentType).includes(type)) {
      return res.status(400).json({ error: "Invalid document type" });
    }
    console.log(req.body);
    const document = await Document.create({ name, type, description });
    res.status(201).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const start = parseInt(req.query.start as string, 10) || 0;
    const end = parseInt(req.query.end as string, 10) || 10;
    const documents = await Document.findAll({
      offset: start,
      limit: end - start + 1,
    });

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type, description } = req.body;

    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    if (type && !Object.values(DocumentType).includes(type)) {
      return res.status(400).json({ error: "Invalid document type" });
    }

    await document.update({ name, type, description });

    res.json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    await document.destroy();

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
