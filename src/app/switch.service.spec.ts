import { TestBed } from '@angular/core/testing';

import { SwitchService } from '../services/switch.service';

describe('SwitchService', () => {
  let service: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
