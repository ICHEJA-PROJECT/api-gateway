import { Module } from '@nestjs/common';
import { ExercisesRecordTransport } from 'src/shared/data/transports/exercises-record.transport';
import {
  PupilExerciseController,
  PupilSkillController,
  PupilTopicController,
} from './controllers';

@Module({
  imports: [ExercisesRecordTransport],
  controllers: [
    PupilExerciseController,
    PupilSkillController,
    PupilTopicController,
  ],
})
export class ExercisesRecordModule {}
