import Answer from "../../domain/entity/Answer";
import { DefaultQuestionsEnum } from "../../domain/entity/enum/DefaultQuestionsEnum";
import QuestionAnswer from "../../domain/entity/QuestionAnswer";
import Survey from "../../domain/entity/Survey";
import SurveyRepository from "../../domain/repository/SurveyRepository";

export default class AnswerSurvey {
  constructor(readonly surveyRepository: SurveyRepository) {}

  async execute(input: Input): Promise<Output | null> {
    console.log("input", input);
    const survey = await this.surveyRepository.get(input.surveyCode);
    if (!survey) return null;

    const questionsToSave: QuestionAnswer[] = [];
    let questionNotFound = false;

    input.answers.map((answer) => {
      const existsQuestions = survey.questions.some(
        (question) => question.code === answer.questionCode
      );
      if (!existsQuestions || questionNotFound) {
        questionNotFound = true;
        return;
      }
      questionsToSave.push(
        new QuestionAnswer(answer.questionCode, answer.answer)
      );
    });

    if (questionNotFound) return null;

    const answerToSave = new Answer(
      input.targetAudience,
      input.customerEmail,
      input.stars,
      questionsToSave
    );

    answerToSave.setSurveyCode(input.surveyCode);
    answerToSave.generateCode();

    this.getDefaultQuestionsCodes(survey).map((questionCode) => {
      const answer = answerToSave.answers.find(
        (answer) => answer.questionCode === questionCode
      );
      if (!answer) {
        questionNotFound = true;
        return;
      }
    });

    return {
      answer: await this.surveyRepository.saveAnswer(answerToSave),
    };
  }

  getDefaultQuestionsCodes(survey: Survey): string[] {
    return survey.questions
      .map((question) => {
        const defaultQuestions = Object.values(
          DefaultQuestionsEnum
        ) as string[];
        const existsDefaultQuestion = defaultQuestions.includes(
          question.statement
        );
        if (existsDefaultQuestion) {
          return question.code;
        }
      })
      .filter((code) => code !== undefined) as string[];
  }
}

type Input = {
  surveyCode: string;
  targetAudience: string;
  customerEmail: string;
  stars: number;
  answers: QuestionAnswer[];
};

type Output = {
  answer: Answer;
};
