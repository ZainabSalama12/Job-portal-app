import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobListingComponent } from './company-job-listing.component';

describe('CompanyJobListingComponent', () => {
  let component: CompanyJobListingComponent;
  let fixture: ComponentFixture<CompanyJobListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyJobListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyJobListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
