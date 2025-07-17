import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ExercisesRecordModule } from './exercises-record/exercises-record.module';

@Module({
  imports: [AuthModule, ExercisesRecordModule],
})
export class AppModule {}
