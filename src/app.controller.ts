import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApplicationConfig } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Render('home')
  getHello() {
    const message = `${this.appService.getHello()}: ${this.configService.get<string>(
      'PORT',
    )}`;
    return {
      message,
    };
  }
}
