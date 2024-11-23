import { z } from "zod";
import { EndpointConfig, EndpointSchema } from "./types";

/**
 * Defines an API endpoint configuration.
 * @template TQuery - The type for query parameters.
 * @template TBody - The type for the request body.
 * @template TResponse - The type for the response.
 * @param {EndpointConfig<TQuery, TBody, TResponse>} config - The configuration for the endpoint.
 * @returns {EndpointConfig<TQuery, TBody, TResponse>} - The parsed and validated endpoint configuration.
 */
export function defineApi<
    TQuery extends z.ZodType,
    TBody extends z.ZodType,
    TResponse extends z.ZodType
>(config: EndpointConfig<TQuery, TBody, TResponse>): EndpointConfig<TQuery, TBody, TResponse> {
    if (!config) {
        throw new Error('Endpoint configuration is required.');
    }

    if (!EndpointSchema.safeParse(config).success) {
        throw new Error('Invalid endpoint configuration.');
    }

    return config;
}
