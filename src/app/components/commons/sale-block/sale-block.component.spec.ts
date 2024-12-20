import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleBlockComponent } from './sale-block.component';

describe('SaleBlockComponent', () => {
  let component: SaleBlockComponent;
  let fixture: ComponentFixture<SaleBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
