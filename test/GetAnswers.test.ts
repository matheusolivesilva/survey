import AnswerSurvey from "../src/application/usecase/AnswerSurvey";
import CreateSurvey from "../src/application/usecase/CreateSurvey";
import GetAnswers from "../src/application/usecase/GetAnswers";
import Question from "../src/domain/entity/Question";
import QuestionAnswer from "../src/domain/entity/QuestionAnswer";
import EmailSenderRepository from "../src/domain/repository/EmailSenderRepository";
import { SortDirectionEnum } from "../src/domain/repository/enum/SortDirectionEnum";
import SurveyRepository from "../src/domain/repository/SurveyRepository";
import MongoDBConnection from "../src/infra/database/MongoDBConnection";
import EmailSenderRepositoryImpl from "../src/infra/repository/EmailSenderRepositoryImpl";
import SurveyRepositoryFactory from "../src/infra/repository/SurveyRepositoryFactory";

test("Should search answers", async () => {
  const connection = new MongoDBConnection();
  const repositoryFactory = new SurveyRepositoryFactory(connection);
  const surveyRepository = repositoryFactory.create();
  const emailSenderRepository = new EmailSenderRepositoryImpl();
  await createAnswers(surveyRepository, emailSenderRepository);

  const input = {
    audience: "Sportists",
    sort: SortDirectionEnum.ASCENDING,
  };

  const getAnswer = new GetAnswers(surveyRepository);
  const answers = await getAnswer.execute(input);

  expect(answers[0]?.targetAudience).toBe(input.audience);
  expect(answers[0]?.stars).toBeLessThanOrEqual(answers[1]?.stars);
  await connection.close();
});

async function createAnswers(
  surveyRepository: SurveyRepository,
  emailSenderRepository: EmailSenderRepository
) {
  const input = {
    name: "Survey with answers",
    questions: [
      new Question("How often do you lift weights?"),
      new Question("How many times per week to you workout?"),
    ],
  };

  const createSurvey = new CreateSurvey(surveyRepository);
  const createdSurvey = await createSurvey.execute(input);

  const answersInput1 = {
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
  const answersInput2 = {
    surveyCode: createdSurvey.code,
    targetAudience: "Sportists",
    customerEmail: "test@gmail.com",
    stars: 4,
    answers: [
      new QuestionAnswer(createdSurvey.questions[0].code || "", "Sportists"),
      new QuestionAnswer(createdSurvey.questions[1].code || "", "4"),
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
  await answerSurvey.execute(answersInput1);
  await answerSurvey.execute(answersInput2);
}
