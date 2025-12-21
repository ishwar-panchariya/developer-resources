import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDifference } from './date-difference';

describe('DateDifference', () => {
  let component: DateDifference;
  let fixture: ComponentFixture<DateDifference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateDifference]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateDifference);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
