import { createServer } from "node:http";

async function handler(req, res) {
  res.end("hello world");
}

const app = createServer(handler).listen(3000, () =>
  console.log("running at 3000")
);

export { app };
