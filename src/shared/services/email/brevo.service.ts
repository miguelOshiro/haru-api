import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EmailDto } from '../../dto/email.dto';

@Injectable()
export class BrevoService {

  //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  process.env.BREVO_API_KEY
  private readonly brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';
  private readonly apiKey = process.env.BREVO_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async sendTransactionalEmail(emailDto: EmailDto): Promise<any> {

    console.log('emaildto', emailDto);

    const headers = {
      'api-key': this.apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.brevoApiUrl, emailDto, { headers }),
      );

      console.log('Correo enviado correctamente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al enviar el correo:', error.response?.data || error.message);
      throw error;
    }
  }

}
