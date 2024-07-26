# Survey
Here you may use an API that manages, creates, updates and exports (as CSV) a survey.

## 📝 Requirements

- [Docker](https://www.docker.com/get-started/)
- [NodeJs](https://nodejs.org/en/download/current)


## 💡 Features
You can see below the endpoints available in this API:

| Method | URL                                                                           | Headers                  | Body                                                                                                                                                                                                                                                                                                                            |
|--------|-------------------------------------------------------------------------------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST   | http://localhost:3000/surveys                                                 | Content-Type: application/json | { "name": "Survey 10", "questions": [ { "statement": "What is your favorite programming language?" }, { "statement": "What is your favorite Linux Distro?" } ] }                                                                                                                              |
| GET    | http://localhost:3000/surveys/a387aa66-8e7a-4efa-93bd-defd9775f7c1            |                          |                                                                                                                                                                                                                                                                                                                                 |
| PUT    | http://localhost:3000/surveys/0272dd25-b11b-40d2-881e-67d30fe5549d            | Content-Type: application/json | { "questions": [ { "code": "aa724c78-ab22-4745-bb84-259e2ee60847", "statement": "Please, fill your email now" }, { "code": "aba857cf-7115-48b8-a9d0-4a7955720307", "statement": "What is your favorite framework?" }, { "statement": "What is your favorite Windows?" }, { "statement": "What is your favorite smartphone OS?" } ] } |
| POST   | http://localhost:3000/surveys/a387aa66-8e7a-4efa-93bd-defd9775f7c1/answers    | Content-Type: application/json | { "surveyCode": "a387aa66-8e7a-4efa-93bd-defd9775f7c1", "targetAudience": "Geeks", "customerEmail": "test@test.com", "stars": 4, "answers": [ { "questionCode": "bee96669-7f2c-4542-889d-4590b73a2dd2", "answer": "test@test.com"}, { "questionCode": "a9e68473-b75a-4935-beee-22bcfef429d6", "answer": "3"}, { "questionCode": "e31d2eb7-d580-49fc-9aca-c88e8e730d24", "answer": "Geeks"}, { "questionCode": "b367fb3d-902e-4ea0-af3d-370651fa1bf3", "answer": "Windows 10"}, { "questionCode": "a32cef58-2b46-44ac-9491-fbafcc419e6e", "answer": "Android Kitkat"} ] } |
| GET    | http://localhost:3000/answers/Geeks?sort=desc                                 |                          |                                                                                                                                                                                                                                                                                                                                 |
| GET    | http://localhost:3000/surveys/export/a387aa66-8e7a-4efa-93bd-defd9775f7c1?sort=desc |                          |                                                                                                                                                                                                                                                                                                                                 |

If you use the extension HTTP Client in VS Code, making the requests througth the file [requests.http](requests.http) might be useful

## 🚀 How to Run?
For this project would be better for you to have Docker and Docker Compose on your machine.

### 🐋 Using Docker:
Simply run:
```console
foo@bar:~$ docker-compose up
```
The docker console will be attached to your terminal, starting Node and MongoDB.

## ✅ Testing
To test you should first access the node terminal using:
```console
foo@bar:~$ docker-compose exec app bash
```

Inside the container, you should run `npm test` in order to execute the tests.

## ⚙️ Made With:

- TypeScript 5.3.3
- NodeJS 18.18.2
- MongoDB 5.0.17
- Express 4.18.2
- Axios 1.7.3
- Jest 29.7.0
- Docker 24.0.7
- Docker Compose 1.29.2

## 🧑🏻‍💻 Author

_Matheus Oliveira da Silva_ - [Github](https://github.com/matheusolivesilva) | [Linkedin](https://www.linkedin.com/in/matheusoliveirasilva/)



