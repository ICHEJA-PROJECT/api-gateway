import { Module } from '@nestjs/common';
import { PupilExerciseController } from './controllers/pupil_exercise.controller';
import { PupilSkillController } from './controllers/pupil_skill.controller';
import { PupilTopicController } from './controllers/pupil_topic.controller';
import { ExercisesRecordTransport } from 'src/shared/data/transports/exercises-record.transport';

@Module({
  imports: [ExercisesRecordTransport],
  controllers: [
    PupilExerciseController,
    PupilSkillController,
    PupilTopicController,
  ],
})
export class ExercisesRecordModule {}
