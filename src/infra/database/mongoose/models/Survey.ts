import { model, Schema } from "mongoose";
import Survey from "../../../../domain/entity/Survey";

const schema = new Schema<Survey>({
  code: { type: String, required: true },
  name: { type: String, required: true },
  questions: [
    {
      code: { type: String, required: true },
      statement: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

schema.index({ code: 1 });
export const SurveySchema = model<Survey>("surveys", schema);
