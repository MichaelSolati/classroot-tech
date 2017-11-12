import { UploaderService } from './uploader.service';
import { ResourcesService } from './resources.service';
import { QuestionsService } from './questions.service';
import { AboutService } from './about.service';

export * from './uploader.service';
export * from './resources.service';
export * from './questions.service';
export * from './about.service';

export const SERVICES: any[] = [
  AboutService,
  UploaderService,
  ResourcesService,
  QuestionsService
];

