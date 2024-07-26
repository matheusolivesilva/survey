export default interface HttpServer {
  on(
    method: string,
    url: string,
    callback: Function,
    routeHandleResponse: boolean
  ): void;
  listen(port: number): void;
}
