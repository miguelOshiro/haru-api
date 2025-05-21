
export class EmailDto {

    subject: string;
    sender: DestinationEmail;
    replyTo: DestinationEmail;
    to: DestinationEmail[];
    htmlContent: string;
    params: DestinationParams;
}

export class DestinationEmail {

    name: string;
    email: string;
}

export class DestinationParams {

    firstName: string;
    link: string;
    dateBlock: Date | null;
    url: string;
    newEmail: string;
}




