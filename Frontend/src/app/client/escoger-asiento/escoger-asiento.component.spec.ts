import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerAsientoComponent } from './escoger-asiento.component';

describe('EscogerAsientoComponent', () => {
  let component: EscogerAsientoComponent;
  let fixture: ComponentFixture<EscogerAsientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscogerAsientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscogerAsientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
