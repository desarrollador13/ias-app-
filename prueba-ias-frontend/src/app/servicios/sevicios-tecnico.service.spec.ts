import { TestBed } from '@angular/core/testing';

import { SeviciosTecnicoService } from './sevicios-tecnico.service';

describe('SeviciosTecnicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeviciosTecnicoService = TestBed.get(SeviciosTecnicoService);
    expect(service).toBeTruthy();
  });
});
