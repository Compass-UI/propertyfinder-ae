import { TestBed, inject } from '@angular/core/testing';

import { TransportationDealsService } from './transportation-deals.service';

describe('TransportationDealsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportationDealsService]
    });
  });

  it('should be created', inject([TransportationDealsService], (service: TransportationDealsService) => {
    expect(service).toBeTruthy();
  }));
});
