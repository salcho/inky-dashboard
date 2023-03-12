import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntsorgungComponent } from './entsorgung.component';

describe('EntsorgungComponent', () => {
  let component: EntsorgungComponent;
  let fixture: ComponentFixture<EntsorgungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntsorgungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntsorgungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
