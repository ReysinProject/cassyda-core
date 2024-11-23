import { z } from "zod";
import {Endpoint, EndpointConfig, EndpointSchema} from "./types";

/**
 * Defines an API endpoint configuration.
 * @template TQuery - The type for query parameters.
 * @template TBody - The type for the request body.
 * @template TResponse - The type for the response.
 * @param {EndpointConfig<TQuery, TBody, TResponse>} config - The configuration for the endpoint.
 * @returns {Endpoint} - The parsed and validated endpoint configuration.
 */
export function defineApi<
    TQuery extends z.ZodType,
    TBody extends z.ZodType,
    TResponse extends z.ZodType
>(config: EndpointConfig<TQuery, TBody, TResponse>): Endpoint {
    return EndpointSchema.parse(config);
}
