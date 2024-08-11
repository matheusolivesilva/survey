import AnswerSurvey from "../src/application/usecase/AnswerSurvey";
import CreateSurvey from "../src/application/usecase/CreateSurvey";
import Question from "../src/domain/entity/Question";
import QuestionAnswer from "../src/domain/entity/QuestionAnswer";
import MongoDBConnection from "../src/infra/database/MongoDBConnection";
import EmailSenderRepositoryImpl from "../src/infra/repository/EmailSenderRepositoryImpl";
import SurveyRepositoryFactory from "../src/infra/repository/SurveyRepositoryFactory";

test("Should create a survey", async () => {
  const connection = new MongoDBConnection();
  const repositoryFactory = new SurveyRepositoryFactory(connection);
  const surveyRepository = repositoryFactory.create();
  const emailSenderRepository = new EmailSenderRepositoryImpl();

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
    targetAudience: "Sportists",
    customerEmail: "test@test.com",
    stars: 5,
    answers: [
      new QuestionAnswer(createdSurvey.questions[0].code || "", "Sportists"),
      new QuestionAnswer(createdSurvey.questions[1].code || "", "3"),
      new QuestionAnswer(
        createdSurvey.questions[2].code || "",
        "teste@teste.com"
      ),
      new QuestionAnswer(createdSurvey.questions[3].code || "", "Everyday"),
      new QuestionAnswer(createdSurvey.questions[4].code || "", "3 times"),
    ],
  };
  const answerSurvey = new AnswerSurvey(
    surveyRepository,
    emailSenderRepository
  );
  const createdAnswers = await answerSurvey.execute(answersInput);

  expect(createdAnswers?.answer.surveyCode).toBe(createdSurvey.code);
  expect(createdAnswers?.answer.targetAudience).toBe("Sportists");
  expect(createdAnswers?.answer.customerEmail).toBe("test@test.com");
  expect(createdAnswers?.answer.stars).toBe(5);
  expect(createdAnswers?.answer.answers[4].questionCode).toBe(
    createdSurvey.questions[4].code
  );
  expect(createdAnswers?.answer.answers[4].answer).toBe("3 times");
  expect(createdAnswers?.answer.answers).toHaveLength(5);
  expect(createdAnswers?.wasEmailSent).toBeTruthy();
  await connection.close();
});
