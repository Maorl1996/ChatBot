import { Request, Response } from "express";
import elasticsearchClient from "../database/elasticSearch";
import routes from "../routes/routes";

async function postMessage(req: Request, res: Response) {
  // const {body} = await elasticsearchClient.search()
  const userId = req.params.userId;
  console.log(req.body);
  const message = req.body.message;

  // io.to(userId).emit('message', message);
  res.send(`User ${userId} has been sent the message: ${message}`);
}

export { postMessage };
