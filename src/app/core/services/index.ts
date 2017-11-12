import { UploaderService } from './uploader.service';
import { ResourcesService } from './resources.service';
import { QuestionsService } from './questions.service';

export * from './uploader.service';
export * from './resources.service';
export * from './questions.service';

export const SERVICES: any[] = [
  UploaderService,
  ResourcesService,
  QuestionsService
];

