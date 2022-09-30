import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Restaurant1Component } from './restaurant1.component';

describe('Restaurant1Component', () => {
  let component: Restaurant1Component;
  let fixture: ComponentFixture<Restaurant1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Restaurant1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restaurant1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
