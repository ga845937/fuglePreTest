import { currencyArray, eventArray, ISubscribeOrNot, ISubscribeOrNotType } from "../../schema/ws/bitstamp";
import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

export const subscribeOrNotProp: ISubscribeOrNotType = {
    currency: { type: "array", items: { type: "string", enum: currencyArray }, minItems: 1, maxItems: 2 },
    event: { type: "string", enum: eventArray }
};

const subscribeOrNotModel: JSONSchemaType<ISubscribeOrNot> = {
    type: "object",
    properties: subscribeOrNotProp as any,
    required: ["currency", "event"],
    additionalProperties: false
};

export const subscribeOrNotValidate = ajv.compile(subscribeOrNotModel);
