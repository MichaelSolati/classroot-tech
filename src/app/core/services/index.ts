import { UploaderService } from './uploader.service';
import { ResourcesService } from './resources.service';

export * from './uploader.service';
export * from './resources.service';

export const SERVICES: any[] = [
  UploaderService,
  ResourcesService
];

