import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreworkoutComponent } from './preworkout.component';

describe('PreworkoutComponent', () => {
  let component: PreworkoutComponent;
  let fixture: ComponentFixture<PreworkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreworkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
