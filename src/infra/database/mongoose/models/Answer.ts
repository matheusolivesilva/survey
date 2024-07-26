import { model, Schema } from "mongoose";
import Answer from "../../../../domain/entity/Answer";

const schema = new Schema<Answer>({
  code: { type: String, required: true },
  surveyCode: { type: String, required: true },
  questionCode: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

schema.index({ code: 1 });
schema.index({ surveyCode: 1 });
schema.index({ questionCode: 1 });
export const AnswerSchema = model<Answer>("answers", schema);
