import Answer from "../../domain/entity/Answer";
import { DefaultQuestionsEnum } from "../../domain/entity/enum/DefaultQuestionsEnum";
import Survey from "../../domain/entity/Survey";
import SurveyRepository from "../../domain/repository/SurveyRepository";

export default class AnswerSurvey {
  constructor(readonly surveyRepository: SurveyRepository) {}

  async execute(input: Input): Promise<Output | null> {
    const survey = await this.surveyRepository.get(input.surveyCode);
    if (!survey) return null;

    const answersToSave: Answer[] = [];
    let questionNotFound = false;

    input.answers.map((answer) => {
      const question = survey.questions.find(
        (question) => question.code === answer.questionCode
      );
      if (!question || questionNotFound) {
        questionNotFound = true;
        return;
      }
      const answerToSave = new Answer(answer.questionCode, answer.answer);
      answerToSave.setSurveyCode(input.surveyCode);
      answerToSave.generateCode();
      answersToSave.push(answerToSave);
    });

    this.getDefaultQuestionsCodes(survey).map((questionCode) => {
      const answer = answersToSave.find(
        (answer) => answer.questionCode === questionCode
      );
      if (!answer) {
        questionNotFound = true;
        return;
      }
    });

    if (questionNotFound) return null;

    return {
      answers: await this.surveyRepository.saveAnswers(answersToSave),
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
  answers: Answer[];
};

type Output = {
  answers: Answer[];
};
