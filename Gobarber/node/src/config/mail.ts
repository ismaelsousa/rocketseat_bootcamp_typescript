interface IMailConfig {
  driver: 'ethereal';
}
export default {
  driver: process.env.MAIL,
} as IMailConfig;
