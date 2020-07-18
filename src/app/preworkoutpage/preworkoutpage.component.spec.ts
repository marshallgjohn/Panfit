import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreworkoutpageComponent } from './preworkoutpage.component';

describe('PreworkoutpageComponent', () => {
  let component: PreworkoutpageComponent;
  let fixture: ComponentFixture<PreworkoutpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreworkoutpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreworkoutpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
