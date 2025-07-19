import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ExercisesRecordModule } from './exercises-record/exercises-record.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  imports: [AuthModule, ExercisesRecordModule, ExercisesModule],
})
export class AppModule {}
