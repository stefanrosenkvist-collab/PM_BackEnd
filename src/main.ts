import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get configuration from environment variables with defaults
  const host = process.env.HOST || '0.0.0.0'; // 0.0.0.0 allows all network interfaces
  const port = parseInt(process.env.PORT || '3000', 10);
  const frontendPort = process.env.FRONTEND_PORT || '5173';
  
  // Build CORS origins dynamically
  const corsOrigins = [
    `http://localhost:${frontendPort}`, // Always allow localhost
  ];
  
  // If host is not localhost/0.0.0.0, add it to CORS origins
  if (host !== '0.0.0.0' && host !== 'localhost' && host !== '127.0.0.1') {
    corsOrigins.push(`http://${host}:${frontendPort}`);
  }
  
  // Allow additional CORS origins from environment variable (comma-separated)
  // Example: CORS_ORIGIN=http://192.168.1.114:5173,http://192.168.1.100:5173
  if (process.env.CORS_ORIGIN) {
    const additionalOrigins = process.env.CORS_ORIGIN
      .split(',')
      .map(origin => origin.trim())
      .filter(origin => origin.length > 0); // Filter out empty strings
    corsOrigins.push(...additionalOrigins);
  }
  
  // Enable CORS for frontend
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });
  
  // Log CORS configuration for debugging
  console.log('CORS enabled for origins:', corsOrigins);
  
  // Enable validation pipe for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(port, host);
  const displayHost = host === '0.0.0.0' ? 'localhost' : host;
  console.log(`Backend running on http://${displayHost}:${port}`);
  if (host === '0.0.0.0') {
    console.log(`Backend accessible on all network interfaces (0.0.0.0:${port})`);
  }
}

bootstrap();
