import HttpServer from "./HttpServer";
import SurveyRepository from "../../domain/repository/SurveyRepository";
import CreateSurvey from "../../application/usecase/CreateSurvey";
import SurveyDTO from "../../application/dto/SurveyDTO";
import GetSurvey from "../../application/usecase/GetSurvey";
import UpdateSurvey from "../../application/usecase/UpdateSurvey";

export default class Router {
  constructor(
    readonly httpServer: HttpServer,
    readonly surveyRepository: SurveyRepository
  ) {}

  async init() {
    this.httpServer.on(
      "post",
      "/surveys",
      async (params: any, body: SurveyDTO) => {
        const createSurvey = new CreateSurvey(this.surveyRepository);
        return await createSurvey.execute(body);
      }
    );

    this.httpServer.on(
      "get",
      "/surveys/:code",
      async (params: any, body: any) => {
        const getSurvey = new GetSurvey(this.surveyRepository);
        return await getSurvey.execute(params.code);
      }
    );

    this.httpServer.on(
      "put",
      "/surveys/:code",
      async (params: any, body: SurveyDTO) => {
        const updateSurvey = new UpdateSurvey(this.surveyRepository);
        return await updateSurvey.execute({ ...body, code: params.code });
      }
    );
  }
}
