import { container } from 'tsyringe';

import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import mailConfig from '@config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';

const provider = {
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  provider[mailConfig.driver],
);
