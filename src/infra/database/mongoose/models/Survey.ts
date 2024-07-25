import { model, Schema } from "mongoose";
import Survey from "../../../../domain/entity/Survey";

const schema = new Schema<Survey>({
  code: { type: String, required: true },
  name: { type: String, required: true },
  targetAudience: { type: String, required: true },
  stars: { type: Number, required: true },
  customerEmail: { type: String, required: true },
  questions: [
    {
      statement: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

schema.index({ code: 1 });
schema.index({ stars: 1 });
schema.index({ targetAudience: 1 });
export const SurveySchema = model<Survey>("surveys", schema);
