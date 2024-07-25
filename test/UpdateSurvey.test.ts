import CreateSurvey from "../src/application/usecase/CreateSurvey";
import UpdateSurvey from "../src/application/usecase/UpdateSurvey";
import MongoDBConnection from "../src/infra/database/MongoDBConnection";
import SurveyRepositoryFactory from "../src/infra/repository/SurveyRepositoryFactory";

test("Should update a survey", async () => {
  const connection = new MongoDBConnection();
  const repositoryFactory = new SurveyRepositoryFactory(connection);
  const surveyRepository = repositoryFactory.create();

  const name = "Pesquisa de satisfação";
  const stars = 5;
  const questions = [
    {
      statement: "How often do you lift weights?",
    },
    {
      statement: "How many times per week to you workout?",
    },
  ];
  const input = {
    name,
    targetAudience: "Sportsman",
    stars,
    customerEmail: "test@gmail.com",
    questions,
  };

  const createSurvey = new CreateSurvey(surveyRepository);
  const surveyToUpdate = await createSurvey.execute(input);

  surveyToUpdate.name = "Pesquisa de esportista";
  surveyToUpdate.stars = 3;
  surveyToUpdate.questions = [
    {
      statement: "How many times per week to you workout?",
    },
  ];
  const updateSurvey = new UpdateSurvey(surveyRepository);
  const updatedSurvey = await updateSurvey.execute(surveyToUpdate);

  expect(updatedSurvey?.code).toBe(surveyToUpdate.code);
  expect(updatedSurvey?.name).not.toBe(name);
  expect(updatedSurvey?.targetAudience).toBe(surveyToUpdate.targetAudience);
  expect(updatedSurvey?.stars).not.toBe(stars);
  expect(updatedSurvey?.questions).toHaveLength(1);
  expect(updatedSurvey?.questions[0].statement).toBe(
    "How many times per week to you workout?"
  );
  await connection.close();
});
