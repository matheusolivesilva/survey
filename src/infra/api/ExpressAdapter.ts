import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";
import HttpStatusCode from "./enums/HttpStatusCode";

export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const output = await callback(req.params, req.body);
      this.response(res, method, output);
    });
  }

  response(res: Response, method: string, output: any) {
    const responseByMethod: any = {
      post: () => res.status(HttpStatusCode.CREATED).json(output),
      put: () =>
        output
          ? res.status(HttpStatusCode.OK).json(output)
          : res
              .status(HttpStatusCode.NOT_FOUND)
              .json({ message: "Resource not found" }),
      get: () =>
        output
          ? res.status(HttpStatusCode.OK).json(output)
          : res
              .status(HttpStatusCode.NOT_FOUND)
              .json({ message: "Resource not found" }),
    };

    return (
      responseByMethod[method]?.() ||
      res.status(405).json({ message: "Method not allowed" })
    );
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
