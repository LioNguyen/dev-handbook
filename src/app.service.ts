import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    const messages = [
      'Hello World! This is first AppService',
      'Hi there!',
      'Greetings!',
      'Hey! How can I assist you today?',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
}
