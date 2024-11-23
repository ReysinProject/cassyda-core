import { z } from 'zod';

/**
 * Enum representing the basic HTTP methods.
 */
const HttpMethodSchema = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
type HttpMethod = z.infer<typeof HttpMethodSchema>;

/**
 * Schema for cache configuration.
 * @property {number} [ttl] - Time to live for the cache.
 * @property {number} [staleTime] - Time after which the cache is considered stale.
 * @property {string[]} [tags] - Tags associated with the cache.
 */
const CacheConfigSchema = z.object({
    ttl: z.number().optional(),
    staleTime: z.number().optional(),
    tags: z.array(z.string()).optional(),
}).strict();

/**
 * Schema for a single endpoint definition.
 * @property {string} path - The path of the endpoint.
 * @property {HttpMethod} method - The HTTP method for the endpoint.
 * @property {Object} [query] - The query parameters for the endpoint.
 * @property {any} [body] - The body of the request.
 * @property {any} response - The expected response from the endpoint.
 * @property {Object} [cache] - The cache configuration for the endpoint.
 */
export const EndpointSchema = z.object({
    path: z.string(),
    method: HttpMethodSchema,
    query: z.record(z.any()).optional(),
    body: z.any().optional(),
    response: z.any(),
    cache: CacheConfigSchema.optional(),
}).strict();

export type Endpoint = z.infer<typeof EndpointSchema>;

/**
 * Type representing the configuration for an endpoint.
 * @template TQuery - The type for query parameters.
 * @template TBody - The type for the request body.
 * @template TResponse - The type for the response.
 * @property {string} path - The path of the endpoint.
 * @property {HttpMethod} method - The HTTP method for the endpoint.
 * @property {TQuery} [query] - The query parameters for the endpoint.
 * @property {TBody} [body] - The body of the request.
 * @property {TResponse} response - The expected response from the endpoint.
 * @property {Object} [cache] - The cache configuration for the endpoint.
 */
export type EndpointConfig<
    TQuery extends z.ZodType = z.ZodType,
    TBody extends z.ZodType = z.ZodType,
    TResponse extends z.ZodType = z.ZodType
> = {
    path: string;
    method: HttpMethod;
    query?: TQuery;
    body?: TBody;
    response: TResponse;
    cache?: z.infer<typeof CacheConfigSchema>;
};