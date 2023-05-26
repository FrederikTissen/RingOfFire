import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsccreenComponent } from './startsccreen.component';

describe('StartsccreenComponent', () => {
  let component: StartsccreenComponent;
  let fixture: ComponentFixture<StartsccreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartsccreenComponent]
    });
    fixture = TestBed.createComponent(StartsccreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
