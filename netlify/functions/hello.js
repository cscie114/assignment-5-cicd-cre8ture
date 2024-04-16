// netlify/functions/hello.mjs
export default async (req, context) => {
    return new Response("Hello, world!");
  };