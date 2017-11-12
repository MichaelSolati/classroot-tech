import { UploaderService } from './uploader.service';
import { ResourcesService } from './resources.service';
import { QuestionsService } from './questions.service';
import { ClassroomsService } from './classrooms.service';

export * from './uploader.service';
export * from './resources.service';
export * from './questions.service';
export * from './classrooms.service';

export const SERVICES: any[] = [
  UploaderService,
  ResourcesService,
  QuestionsService,
  ClassroomsService
];

