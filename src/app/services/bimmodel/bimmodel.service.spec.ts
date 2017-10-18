import { TestBed, inject } from '@angular/core/testing';

import { BimModelService } from './bimmodel.service';

describe('BimModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BimModelService]
    });
  });

  it('should be created', inject([BimModelService], (service: BimModelService) => {
    expect(service).toBeTruthy();
  }));
});
