import { UploaderService } from './uploader.service';
import { ResourcesService } from './resources.service';
import { ClassroomsService } from './classrooms.service';
import { AboutService } from './about.service';

export * from './uploader.service';
export * from './resources.service';
export * from './about.service';
export * from './classrooms.service';

export const SERVICES: any[] = [
  AboutService,
  UploaderService,
  ResourcesService,
  ClassroomsService
];

