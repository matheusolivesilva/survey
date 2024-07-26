import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";
import HttpStatusCode from "./enums/HttpStatusCode";
import { HttpMethods } from "./enums/HttpMethods";

export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: HttpMethods, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const output = await callback(req.params, req.body, req.query);
      this.sendResponse(res, method, output);
    });
  }

  sendResponse(res: Response, method: HttpMethods, output: any) {
    const responseByMethod: any = {
      post: () => this.response(res, HttpStatusCode.CREATED, output),
      put: () => this.response(res, HttpStatusCode.OK, output),
      get: () => this.response(res, HttpStatusCode.OK, output),
    };

    return (
      responseByMethod[method]?.() ||
      res.status(405).json({ message: "Method not allowed" })
    );
  }

  response(res: Response, status: HttpStatusCode, output: any) {
    if (output) return res.status(status).json(output);

    return res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ message: "Resource not found" });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
