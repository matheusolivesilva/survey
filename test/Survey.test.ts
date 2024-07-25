import Survey from "../src/domain/entity/Survey";

test("should create a survey", () => {
  const code = crypto.randomUUID();
  const survey = Survey.create(
    code,
    "Pesquisa de satisfação",
    "Sportsman",
    5,
    "test@gmail.com",
    [
      {
        statement: "How often do you lift weights?",
      },
      {
        statement: "How many times per week to you workout?",
      },
    ]
  );

  expect(survey.code).toBe(code);
  expect(survey.name).toBe("Pesquisa de satisfação");
  expect(survey.targetAudience).toBe("Sportsman");
  expect(survey.stars).toBe(5);
  expect(survey.questions).toHaveLength(2);
  expect(survey.questions[0].statement).toBe("How often do you lift weights?");
  expect(survey.questions[1].statement).toBe(
    "How many times per week to you workout?"
  );
});
