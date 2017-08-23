import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BimListComponent } from './bim-list.component';

describe('BimListComponent', () => {
  let component: BimListComponent;
  let fixture: ComponentFixture<BimListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BimListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
