import { IJSONSchemaType } from "../utils/utils";

export interface IReadData {
    user: number
}

export type IReadDataType = {
    [K in keyof IReadData]: IJSONSchemaType
}
