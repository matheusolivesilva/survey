import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";
import MongoDBConnection from "./infra/database/MongoDBConnection";
import FileGeneratorRepositoryFactory from "./infra/repository/FileGeneratorRepositoryFactory";
import SurveyRepositoryFactory from "./infra/repository/SurveyRepositoryFactory";

const connection = new MongoDBConnection();
const repositoryFactory = new SurveyRepositoryFactory(connection);
const fileGeneratorRepositoryFactory = new FileGeneratorRepositoryFactory(
  connection
);
const surveyRepository = repositoryFactory.create();
const fileGeneratorRepository = fileGeneratorRepositoryFactory.create();

const httpServer = new ExpressAdapter();
const router = new Router(
  httpServer,
  surveyRepository,
  fileGeneratorRepository
);
router.init();
httpServer.listen(3000);
