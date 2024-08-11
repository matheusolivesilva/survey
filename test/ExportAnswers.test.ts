import AnswerSurvey from "../src/application/usecase/AnswerSurvey";
import CreateSurvey from "../src/application/usecase/CreateSurvey";
import ExportAnswers from "../src/application/usecase/ExportAnswers";
import Question from "../src/domain/entity/Question";
import QuestionAnswer from "../src/domain/entity/QuestionAnswer";
import EmailSenderRepository from "../src/domain/repository/EmailSenderRepository";
import { SortDirectionEnum } from "../src/domain/repository/enum/SortDirectionEnum";
import SurveyRepository from "../src/domain/repository/SurveyRepository";
import MongoDBConnection from "../src/infra/database/MongoDBConnection";
import EmailSenderRepositoryImpl from "../src/infra/repository/EmailSenderRepositoryImpl";
import FileGeneratorRepositoryFactory from "../src/infra/repository/FileGeneratorRepositoryFactory";
import SurveyRepositoryFactory from "../src/infra/repository/SurveyRepositoryFactory";

test("Should export CSV file", async () => {
  const connection = new MongoDBConnection();
  const surveyRepositoryFactory = new SurveyRepositoryFactory(connection);
  const fileGeneratorRepositoryFactory = new FileGeneratorRepositoryFactory(
    connection
  );
  const surveyRepository = surveyRepositoryFactory.create();
  const fileGeneratorRepository = fileGeneratorRepositoryFactory.create();
  const emailSenderRepository = new EmailSenderRepositoryImpl();
  const surveyCode = await createAnswers(
    surveyRepository,
    emailSenderRepository
  );

  const exportAnswers = new ExportAnswers(
    surveyRepository,
    fileGeneratorRepository
  );

  const input = {
    surveyCode,
    sort: SortDirectionEnum.ASCENDING,
  };
  const csvFileName = await exportAnswers.execute(input);

  expect(typeof csvFileName).toBe("string");
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
  return createdSurvey.code;
}
