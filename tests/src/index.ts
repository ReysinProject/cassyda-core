import {z} from "zod";
import {defineApi} from "@reysin/cassida";

console.log("test")

defineApi({
	url: "/api/v2/users",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  staleTime: 30000,
  propsType: "get",
  propsScheme: z.object({}),
  returnScheme: z.object({}),
})