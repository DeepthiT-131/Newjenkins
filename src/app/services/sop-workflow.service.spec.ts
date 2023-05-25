import { TestBed } from '@angular/core/testing';

import { SopWorkflowService } from './sop-workflow.service';

describe('SopWorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SopWorkflowService = TestBed.get(SopWorkflowService);
    expect(service).toBeTruthy();
  });
});
