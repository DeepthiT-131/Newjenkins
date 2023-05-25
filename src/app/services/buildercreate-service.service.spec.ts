import { TestBed } from '@angular/core/testing';

import { BuildercreateServiceService } from './buildercreate-service.service';

describe('BuildercreateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildercreateServiceService = TestBed.get(BuildercreateServiceService);
    expect(service).toBeTruthy();
  });
});
