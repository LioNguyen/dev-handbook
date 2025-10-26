import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { AppController } from './app.controller'
import { DataModule } from './data/data.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    DataModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
