import { EndpointConfig } from "../api/types";
import { z } from "zod";

export class CassidaClient {
    private static instance: CassidaClient;
    private constructor() { }

    /*
    *  Singleton instance getter
    *
    * @returns {CassidaClient} The singleton instance
    * */
    public static getInstance() {
        if (!CassidaClient.instance) {
            CassidaClient.instance = new CassidaClient();
        }
        return CassidaClient.instance;
    }

    /*
    * Subscribes to an endpoint
    *
    * @template TResponse - The type for the response.
    * @param {EndpointConfig<z.ZodType, z.ZodType, TResponse>} endpoint - The configuration for the endpoint.
    * @param {string[]} tags - The tags associated with the cache.
    * @returns {Promise<z.infer<TResponse>>} The response from the endpoint.
     */
    public subscribe<TResponse extends z.ZodType>(
        endpoint: EndpointConfig<z.ZodType, z.ZodType, TResponse>,
        tags: string[]
    ): Promise<z.infer<TResponse>> {
        return new Promise((resolve) => {
            resolve({
                length: 10,
                fact: 'Cats are cute'
            } as z.infer<TResponse>);
        });
    }
}
