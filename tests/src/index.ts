import {CassidaClient, defineApi} from "@reysin/cassida";
import {z} from "zod";

const getUserEndpoint = defineApi({
  path: 'https://catfact.ninja/fact',
  method: 'GET',
  response: z.object({
    length: z.number(),
    fact: z.string(),
  }),
  cache: {
    ttl: 5000,
    tags: ['cat', 'fact'],
  },
});

const client = CassidaClient.getInstance();

client.subscribe(getUserEndpoint, [
  "fact",
]).then((response) => {
    console.log(typeof response);
})