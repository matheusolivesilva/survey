import CreateSurvey from "../src/application/usecase/CreateSurvey";
import UpdateSurvey from "../src/application/usecase/UpdateSurvey";
import Question from "../src/domain/entity/Question";
import MongoDBConnection from "../src/infra/database/MongoDBConnection";
import SurveyRepositoryFactory from "../src/infra/repository/SurveyRepositoryFactory";

test("Should update a survey", async () => {
  const connection = new MongoDBConnection();
  const repositoryFactory = new SurveyRepositoryFactory(connection);
  const surveyRepository = repositoryFactory.create();

  const name = "Pesquisa de satisfação";

  const questions = [
    new Question("How often do you lift weights?"),
    new Question("How many times per week do you workout?"),
  ];
  const input = {
    name,
    questions,
  };

  const createSurvey = new CreateSurvey(surveyRepository);
  const surveyToUpdate = await createSurvey.execute(input);

  surveyToUpdate.name = "Pesquisa de esportista";
  surveyToUpdate.questions[3].statement = "How many times per week do you run?";
  const updateSurvey = new UpdateSurvey(surveyRepository);
  const updatedSurvey = await updateSurvey.execute(surveyToUpdate);

  expect(updatedSurvey?.code).toBe(surveyToUpdate.code);
  expect(updatedSurvey?.name).not.toBe(name);
  expect(updatedSurvey?.questions).toHaveLength(5);
  expect(updatedSurvey?.questions[3].statement).toBe(
    "How many times per week do you run?"
  );
  await connection.close();
});
