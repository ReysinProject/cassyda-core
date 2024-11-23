import {CassidaClient, defineApi} from "@reysin/cassida";
import {z} from "zod";

const getUserEndpoint = defineApi({
  path: '/users/:id',
  method: 'GET',
  query: z.object({
    include: z.array(z.string()).optional(),
    fields: z.array(z.string()).optional(),
  }),
  response: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.string().datetime(),
  }),
  cache: {
    ttl: 5000,
    tags: ['user'],
  },
});

console.log(getUserEndpoint);
console.log(CassidaClient.getInstance());