import { TestBed, inject } from '@angular/core/testing';

import { WorksetService } from './workset.service';

describe('WorksetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorksetService]
    });
  });

  it('should be created', inject([WorksetService], (service: WorksetService) => {
    expect(service).toBeTruthy();
  }));
});
