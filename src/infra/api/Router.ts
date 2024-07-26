import { createReadStream } from "fs";
import HttpServer from "./HttpServer";
import SurveyRepository from "../../domain/repository/SurveyRepository";
import CreateSurvey from "../../application/usecase/CreateSurvey";
import SurveyDTO from "../../application/dto/SurveyDTO";
import GetSurvey from "../../application/usecase/GetSurvey";
import UpdateSurvey from "../../application/usecase/UpdateSurvey";
import AnswerSurvey from "../../application/usecase/AnswerSurvey";
import AnswerDTO from "../../application/dto/AnswerDTO";
import { HttpMethods } from "./enums/HttpMethods";
import GetAnswers from "../../application/usecase/GetAnswers";
import { SortDirectionEnum } from "../../domain/repository/enum/SortDirectionEnum";
import ExportAnswers from "../../application/usecase/ExportAnswers";
import FileGeneratorRepository from "../../domain/repository/FileGeneratorRepository";
import { Response } from "express";

export default class Router {
  constructor(
    readonly httpServer: HttpServer,
    readonly surveyRepository: SurveyRepository,
    readonly fileGeneratorRepository: FileGeneratorRepository
  ) {}

  async init() {
    this.httpServer.on(
      HttpMethods.POST,
      "/surveys",
      async (params: any, body: SurveyDTO, query: any, res: Response) => {
        const createSurvey = new CreateSurvey(this.surveyRepository);
        return await createSurvey.execute(body);
      },
      false
    );

    this.httpServer.on(
      HttpMethods.GET,
      "/surveys/:code",
      async (params: any, body: any, query: any, res: Response) => {
        const getSurvey = new GetSurvey(this.surveyRepository);
        return await getSurvey.execute(params.code);
      },
      false
    );

    this.httpServer.on(
      HttpMethods.PUT,
      "/surveys/:code",
      async (
        params: { code: string },
        body: SurveyDTO,
        query: any,
        res: Response
      ) => {
        const updateSurvey = new UpdateSurvey(this.surveyRepository);
        return await updateSurvey.execute({ ...body, code: params.code });
      },
      false
    );

    this.httpServer.on(
      HttpMethods.POST,
      "/surveys/:surveyCode/answers",
      async (
        params: { surveyCode: string },
        body: AnswerDTO,
        query: any,
        res: Response
      ) => {
        const createSurvey = new AnswerSurvey(this.surveyRepository);
        return await createSurvey.execute({
          ...body,
          surveyCode: params.surveyCode,
        });
      },
      false
    );

    this.httpServer.on(
      HttpMethods.GET,
      "/answers/:audience",
      async (
        params: { audience: string },
        body: any,
        query: { sort: SortDirectionEnum },
        res: Response
      ) => {
        const getAnswer = new GetAnswers(this.surveyRepository);
        return await getAnswer.execute({
          audience: params.audience,
          sort: query.sort,
        });
      },
      false
    );

    this.httpServer.on(
      HttpMethods.GET,
      "/surveys/export/:code",
      async (
        params: { code: string },
        body: any,
        query: { sort: SortDirectionEnum },
        res: Response
      ) => {
        const exportAnswers = new ExportAnswers(
          this.surveyRepository,
          this.fileGeneratorRepository
        );
        const filename = await exportAnswers.execute({
          surveyCode: params.code,
          sort: query.sort,
        });
        const stream = createReadStream(`./${filename}`);
        res.attachment(`./${filename}`);
        stream.pipe(res);
      },
      true
    );
  }
}
