import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TematicasComponent } from './tematicas.component';

describe('TematicasComponent', () => {
  let component: TematicasComponent;
  let fixture: ComponentFixture<TematicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TematicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TematicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
