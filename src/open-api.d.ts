declare module "open-api" {
    export interface OpenApiSchema {
        $ref: string
        type?: OpenApiBaseType
    }

    export interface OpenApiTag {
        name: string
        description: string
    }
    export interface OpenApiPath {
        tags: string[]
        summary: string
        description: string
        operationId: string
        consumes: string[]
        produces: string[]
        parameters: {
            in: string
            name: string
            description: string
            required: boolean
            schema: OpenApiSchema
        }[]
        responses: Record<
            HttpStatusCode,
            {
                description: string
                schema?: OpenApiSchema
            }
        >
    }

    export interface OpenApiProperty {
        type: OpenApiBaseType
        items?: OpenApiSchema
        description: string
        format?: string
        example?: string
    }

    export interface OpenApiDefinition {
        type: OpenApiBaseType
        title?: string
        required: string[]
        properties: Record<string, OpenApiProperty>
    }

    export interface OpenApiResult {
        tags: OpenApiTag[]
        paths: Record<string, Record<HttpMethod, OpenApiPath>>
        definitions: Record<string, OpenApiDefinition>
    }

    export interface OpenApiOperation {
        name: string
        path: string
        method: HttpMethod
        description: string
        returnType: string
        parameters: OpenApiRequestParams[]
    }

    export interface OpenApiModule {
        name: string
        description: string
        paths: OpenApiOperation[]
        imports: string[]
    }

    export interface OpenApiModelProperty extends Omit<OpenApiProperty, "type"> {
        name: string
        required: boolean
        type: string
    }

    export interface OpenApiModel {
        name: string
        title?: string
        properties: OpenApiModelProperty[]
    }

    export interface OpenApiRequestParams {
        name: string
        required: boolean
        type: string
    }
}
