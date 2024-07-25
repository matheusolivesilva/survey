import axios from "axios";
import Survey from "../src/domain/entity/Survey";

test("Should create a survey", async () => {
  const createdResponse = await axios({
    url: "http://localhost:3000/surveys",
    method: "post",
    data: {
      name: "Pesquisa de satisfação",
      questions: [
        {
          statement: "How often do you lift weights?",
        },
        {
          statement: "How many times per week to you workout?",
        },
      ],
    },
  });
  const createdSurvey: Survey = createdResponse.data;

  const response = await axios({
    url: `http://localhost:3000/surveys/${createdSurvey.code}`,
    method: "get",
  });

  const surveyResponse: Survey = response.data;
  expect(surveyResponse.code).toBe(createdSurvey.code);
  expect(surveyResponse.name).toBe("Pesquisa de satisfação");
  expect(surveyResponse.questions).toHaveLength(5);
  expect(surveyResponse.questions[0].statement).toBe(
    "How often do you lift weights?"
  );
  expect(surveyResponse.questions[4].statement).toBe("Please, fill your email");
});
