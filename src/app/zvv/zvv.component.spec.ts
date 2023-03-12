import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZvvComponent } from './zvv.component';

describe('ZvvComponent', () => {
  let component: ZvvComponent;
  let fixture: ComponentFixture<ZvvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZvvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZvvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
