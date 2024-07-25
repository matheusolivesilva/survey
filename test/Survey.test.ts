import Question from "../src/domain/entity/Question";
import Survey from "../src/domain/entity/Survey";

test("should create a survey", () => {
  const code = crypto.randomUUID();
  const survey = Survey.create(code, "Pesquisa de satisfação", [
    new Question("How often do you lift weights?"),
    new Question("How many times per week to you workout?"),
  ]);

  expect(survey.code).toBe(code);
  expect(survey.name).toBe("Pesquisa de satisfação");
  expect(survey.questions).toHaveLength(5);
  expect(survey.questions[0].statement).toBe("Please, fill your email");
  expect(survey.questions[1].statement).toBe(
    "How many stars would you give to this survey?"
  );
});
