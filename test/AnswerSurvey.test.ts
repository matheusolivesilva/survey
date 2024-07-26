import AnswerSurvey from "../src/application/usecase/AnswerSurvey";
import CreateSurvey from "../src/application/usecase/CreateSurvey";
import Answer from "../src/domain/entity/Answer";
import Question from "../src/domain/entity/Question";
import MongoDBConnection from "../src/infra/database/MongoDBConnection";
import SurveyRepositoryFactory from "../src/infra/repository/SurveyRepositoryFactory";

test("Should create a survey", async () => {
  const connection = new MongoDBConnection();
  const repositoryFactory = new SurveyRepositoryFactory(connection);
  const surveyRepository = repositoryFactory.create();

  const input = {
    name: "Survey with answers",
    questions: [
      new Question("How often do you lift weights?"),
      new Question("How many times per week to you workout?"),
    ],
  };

  const createSurvey = new CreateSurvey(surveyRepository);
  const createdSurvey = await createSurvey.execute(input);

  const answersInput = {
    surveyCode: createdSurvey.code,
    answers: [
      new Answer(createdSurvey.questions[0].code || "", "Sportists"),
      new Answer(createdSurvey.questions[1].code || "", "3"),
      new Answer(createdSurvey.questions[2].code || "", "teste@teste.com"),
      new Answer(createdSurvey.questions[3].code || "", "Everyday"),
      new Answer(createdSurvey.questions[4].code || "", "3 times"),
    ],
  };
  const answerSurvey = new AnswerSurvey(surveyRepository);
  const createdAnswers = await answerSurvey.execute(answersInput);

  expect(createdAnswers?.answers[1].surveyCode).toBe(createdSurvey.code);
  expect(createdAnswers?.answers[4].questionCode).toBe(
    createdSurvey.questions[4].code
  );
  expect(createdAnswers?.answers[4].answer).toBe("3 times");
  expect(createdAnswers?.answers).toHaveLength(5);
  await connection.close();
});
