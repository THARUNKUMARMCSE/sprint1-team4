import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Restaurant2Component } from './restaurant2.component';

describe('Restaurant2Component', () => {
  let component: Restaurant2Component;
  let fixture: ComponentFixture<Restaurant2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Restaurant2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restaurant2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
