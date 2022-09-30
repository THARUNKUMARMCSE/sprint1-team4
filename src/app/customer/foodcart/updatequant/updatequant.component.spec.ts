import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatequantComponent } from './updatequant.component';

describe('UpdatequantComponent', () => {
  let component: UpdatequantComponent;
  let fixture: ComponentFixture<UpdatequantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatequantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatequantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
