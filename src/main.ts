import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";
import MongoDBConnection from "./infra/database/MongoDBConnection";
import SurveyRepositoryFactory from "./infra/repository/SurveyRepositoryFactory";

const connection = new MongoDBConnection();
const repositoryFactory = new SurveyRepositoryFactory(connection);
const surveyRepository = repositoryFactory.create();

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, surveyRepository);
router.init();
httpServer.listen(3000);
