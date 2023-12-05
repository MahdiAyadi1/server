"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentType = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
var DocumentType;
(function (DocumentType) {
    DocumentType["PDF"] = "PDF";
    DocumentType["TXT"] = "TXT";
    DocumentType["XDOC"] = "XDOC";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
class Document extends sequelize_1.Model {
}
Document.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(DocumentType)),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: "Document",
});
exports.default = Document;
