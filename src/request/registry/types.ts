import {z} from "zod";

export const apiConfigSchema = z.object({
	url: z.string().url(),
	method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
	headers: z.object({}),
	staleTime: z.number(),
	propsType: z.enum(["url", "body", "form"]),
	propsScheme: z.object({}),
	returnScheme: z.object({}),
});

export type ApiConfig = z.infer<typeof apiConfigSchema>;