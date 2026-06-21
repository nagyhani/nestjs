import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailService{

    private transporter;

    constructor(private readonly configService: ConfigService){
        this.transporter = nodemailer.createTransport({
            port: this.configService.get('mailer').port,
            host: this.configService.get('mailer').host,
            secure:true,
            auth:{
                pass: this.configService.get('mailer').password,
                user: this.configService.get('mailer').email
            },

            tls: {
  rejectUnauthorized: false,
}
        })
    }


     async sendEmail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: `"DEMO" <${this.configService.get('mailer').email}>`,
      to,
      subject,
      html,
    });
  }

 
}