import { plainToInstance } from 'class-transformer';
import { SignUpRequestDto } from './signup.dto';
import { User } from '../../../entities';
import { Role } from 'src/entities/role.entity';
import { DestinationEmail, DestinationParams, EmailDto } from 'src/shared/dto/email.dto';

export function signUpMapper(dto: SignUpRequestDto): User {

  const role = new Role;
  role.id = '333eea5c-4ebe-4ac3-b938-a8e698394444';

  const user = plainToInstance(User, dto);
  user.avatar = 'default.png';
  user.role =  role;

  return user;
}

export function emailMapper(user: User, subject: string, htmlContent: string): EmailDto {

   // Envía el correo
   const sender = new DestinationEmail;
   sender.name = process.env.EMAIL_NAME!;
   sender.email = process.env.EMAIL_SENDER!;
   
   const replyTo = new DestinationEmail;
   replyTo.name = 'pp';
   replyTo.email = 'joshirog@gmail.com';

   const to1 = new DestinationEmail;
   to1.name = user.firstname;
   to1.email = user.email;

   const to2 = new DestinationEmail;
   to2.name = 'miguel';
   to2.email = '0shiromiguel@gmail.com';

   const to: DestinationEmail[] = [];
   to.push(to1);
   to.push(to2);

  
   const email = new EmailDto;
   email.subject = subject;
   email.sender = sender;
   email.replyTo = replyTo;
   email.to = to;

   email.htmlContent = htmlContent;
  const param = new DestinationParams;

  param.firstName = user.firstname;
  param.link = process.env.WEB_LINK!;
  email.params = param;

   return email;
}