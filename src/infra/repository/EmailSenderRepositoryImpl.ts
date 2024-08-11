import EmailSenderRepository from "../../domain/repository/EmailSenderRepository";
import { createTransport } from "nodemailer";

export default class EmailSenderRepositoryImpl
  implements EmailSenderRepository
{
  async send(email: string): Promise<boolean> {
    try {
      const transporter = createTransport({
        host: process.env.MAIL_HOST_URL,
        port: process.env.MAIL_HOST_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASSWORD,
        },
      } as never);

      const info = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: `${email}`,
        subject: "Obrigado por responder nossa pesquisa!",
        text: "Obrigado por responder nossa pesquisa! loren ipsun",
      });
      return true;
    } catch (error) {
      console.error("Ocorreu um erro...", error);
      return false;
    }
  }
}
