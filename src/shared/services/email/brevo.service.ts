import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EmailDto } from '../../dto/email.dto';
import { StorageService } from '../storage/storage.service';


@Injectable()
export class EmailService {

  private readonly brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';
  private readonly apiKey = process.env.BREVO_API_KEY;

  constructor(private readonly httpService: HttpService,
    private readonly storageService: StorageService,) {}

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
