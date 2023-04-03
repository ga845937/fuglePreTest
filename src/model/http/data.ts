import { IReadDataType, IReadData } from "../../schema/http/data";
import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

export const readDataProp: IReadDataType = {
    user: { type: "number" }
};

const readDataModel: JSONSchemaType<IReadData> = {
    type: "object",
    properties: readDataProp as any,
    required: ["user"],
    additionalProperties: false
};

export const readDataValidate = ajv.compile(readDataModel);
