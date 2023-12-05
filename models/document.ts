import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../database/database";
type UUID = string;

export enum DocumentType {
  PDF = "PDF",
  TXT = "TXT",
  XDOC = "XDOC",
}

class Document extends Model {
  public id!: UUID;
  public name!: string;
  public type!: DocumentType;
  public description!: string;
}

Document.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(DocumentType)),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Document",
  }
);

export default Document;
