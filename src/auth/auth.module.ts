import { Module } from '@nestjs/common';
import { AuthTransport } from 'src/shared/data/transports/auth.transport';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [AuthTransport],
  controllers: [AuthController],
})
export class AuthModule {}
