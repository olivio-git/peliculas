import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContCarComponent } from './cont-car.component';

describe('ContCarComponent', () => {
  let component: ContCarComponent;
  let fixture: ComponentFixture<ContCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
