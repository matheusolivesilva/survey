import CreateSurvey from "../src/application/usecase/CreateSurvey";
import GetSurvey from "../src/application/usecase/GetSurvey";
import MongoDBConnection from "../src/infra/database/MongoDBConnection";
import SurveyRepositoryFactory from "../src/infra/repository/SurveyRepositoryFactory";

test("Should create a survey", async () => {
  const connection = new MongoDBConnection();
  const repositoryFactory = new SurveyRepositoryFactory(connection);
  const surveyRepository = repositoryFactory.create();

  const input = {
    name: "Pesquisa de satisfação",
    targetAudience: "Sportsman",
    stars: 5,
    customerEmail: "test@gmail.com",
    questions: [
      {
        statement: "How often do you lift weights?",
      },
      {
        statement: "How many times per week to you workout?",
      },
    ],
  };

  const createSurvey = new CreateSurvey(surveyRepository);
  const createdSurvey = await createSurvey.execute(input);

  const getSurvey = new GetSurvey(surveyRepository);
  const survey = await getSurvey.execute(createdSurvey.code);
  expect(survey?.code).toBe(createdSurvey.code);
  expect(survey?.name).toBe("Pesquisa de satisfação");
  expect(survey?.targetAudience).toBe("Sportsman");
  expect(survey?.stars).toBe(5);
  expect(survey?.questions).toHaveLength(2);
  expect(survey?.questions[0].statement).toBe("How often do you lift weights?");
  expect(survey?.questions[1].statement).toBe(
    "How many times per week to you workout?"
  );
  await connection.close();
});
