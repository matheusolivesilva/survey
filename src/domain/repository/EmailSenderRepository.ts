export default interface EmailSenderRepository {
  send(email: string): Promise<boolean>;
}
