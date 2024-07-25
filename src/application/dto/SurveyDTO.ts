import QuestionDTO from "./QuestionDTO";

export default class SurveyDTO {
  constructor(
    readonly name: string,
    readonly targetAudience: string,
    readonly stars: number,
    readonly customerEmail: string,
    readonly questions: QuestionDTO[]
  ) {}
}
