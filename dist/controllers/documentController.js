"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getDocuments = exports.getDocumentById = exports.createDocument = void 0;
const document_1 = __importStar(require("../models/document"));
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, description } = req.body;
        if (!Object.values(document_1.DocumentType).includes(type)) {
            return res.status(400).json({ error: "Invalid document type" });
        }
        console.log(req.body);
        const document = yield document_1.default.create({ name, type, description });
        res.status(201).json(document);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createDocument = createDocument;
const getDocumentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const document = yield document_1.default.findByPk(id);
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }
        res.json(document);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getDocumentById = getDocumentById;
const getDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const start = parseInt(req.query.start, 10) || 0;
        const end = parseInt(req.query.end, 10) || 10;
        const documents = yield document_1.default.findAll({
            offset: start,
            limit: end - start + 1,
        });
        res.json(documents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getDocuments = getDocuments;
const updateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, type, description } = req.body;
        const document = yield document_1.default.findByPk(id);
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }
        if (type && !Object.values(document_1.DocumentType).includes(type)) {
            return res.status(400).json({ error: "Invalid document type" });
        }
        yield document.update({ name, type, description });
        res.json(document);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateDocument = updateDocument;
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const document = yield document_1.default.findByPk(id);
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }
        yield document.destroy();
        res.json({ message: "Document deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteDocument = deleteDocument;
