import { Module } from '@nestjs/common';
import { ExercisesTransport } from 'src/shared/data/transports/exercises.transport';
import {
  ExerciseController,
  LayoutController,
  ResourceController,
  SkillController,
  TemplateController,
  TemplateInstructionMediaController,
  TemplateSkillController,
  TopicController,
  TopicResourceController,
  TopicSequenceController,
  TypeInstructionMediaController,
  TypeLayoutController,
  UnitController,
} from './controllers';

@Module({
  imports: [ExercisesTransport],
  controllers: [
    ExerciseController,
    LayoutController,
    ResourceController,
    SkillController,
    TemplateInstructionMediaController,
    TemplateSkillController,
    TemplateController,
    TopicResourceController,
    TopicSequenceController,
    TopicController,
    TypeInstructionMediaController,
    TypeLayoutController,
    UnitController,
  ],
})
export class ExercisesModule {}
