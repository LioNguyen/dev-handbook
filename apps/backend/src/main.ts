import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'http://localhost:3000',
    ],
    credentials: true,
  })

  const port = process.env.PORT || 3000

  console.log('🚀 @LIO ~ apps/backend/src/main.ts ~ 19 ~ port ~ ', port)

  await app.listen(port)
  console.log(`🚀 Backend API running on http://localhost:${port}`)
}

bootstrap()
