import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAvionComponent } from './detalle-avion.component';

describe('DetalleAvionComponent', () => {
  let component: DetalleAvionComponent;
  let fixture: ComponentFixture<DetalleAvionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAvionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAvionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
