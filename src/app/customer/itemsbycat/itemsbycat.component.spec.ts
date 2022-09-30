import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsbycatComponent } from './itemsbycat.component';

describe('ItemsbycatComponent', () => {
  let component: ItemsbycatComponent;
  let fixture: ComponentFixture<ItemsbycatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsbycatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsbycatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
