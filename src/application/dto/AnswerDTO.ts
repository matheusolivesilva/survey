import Answer from "../../domain/entity/Answer";

export default class AnswerDTO {
  constructor(readonly answers: Answer[]) {}
}
