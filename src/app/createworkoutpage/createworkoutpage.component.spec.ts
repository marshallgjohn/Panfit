import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateworkoutpageComponent } from './createworkoutpage.component';

describe('CreateworkoutpageComponent', () => {
  let component: CreateworkoutpageComponent;
  let fixture: ComponentFixture<CreateworkoutpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateworkoutpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateworkoutpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
