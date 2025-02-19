import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDespachoComponent } from './formulario-despacho.component';

describe('FormularioDespachoComponent', () => {
  let component: FormularioDespachoComponent;
  let fixture: ComponentFixture<FormularioDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDespachoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
