interface IItems {
    type: string
    enum?: readonly any[]
}

export interface IJSONSchemaType {
    type: string
    items?: IItems
    minItems?: number
    maxItems?: number
    enum?: readonly any[]
}
