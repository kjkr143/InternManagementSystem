import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { WorkingHoursModel } from './working-hours.model';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.css']
})
export class WorkingHoursComponent implements OnInit {
 
  formValue !: FormGroup;
  internWorkingData !: any;
  internWorkingHoursObj : WorkingHoursModel = new WorkingHoursModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  role:string =""
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      internName: [''],
      companyHours: [''],
      internHours: [''],
      endingHours: [''] 
    })
    this.getInternWorkingDetails();
    this.role = localStorage.getItem('userType')!
  }
  clickAddWorkingHours(){
      this.formValue.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }
    postInternWorkingDetails() {
      this.internWorkingHoursObj.InternName = this.formValue.value.internName;
      this.internWorkingHoursObj.CompanyHours = this.formValue.value.companyHours;
      this.internWorkingHoursObj.InternHours = this.formValue.value.internHours;
      this.internWorkingHoursObj.EndingHours = this.formValue.value.endingHours;
      this.api.PostIntern(this.internWorkingHoursObj)
        .subscribe(res => {
          console.log(res);
          let ref = document.getElementById('close');
        ref?.click();
        this.getInternWorkingDetails();
        })
    }
    getInternWorkingDetails() {
      this.api.GetInterns()
      .subscribe(res=>{
        this.internWorkingData = res.internDetails;
        
      })
    }
    editInternWorkingDetail(){
      this.internWorkingHoursObj.InternName = this.formValue.value.internName;
      this.internWorkingHoursObj.CompanyHours = this.formValue.value.companyHours;
      this.internWorkingHoursObj.InternHours = this.formValue.value.internHours;
      this.internWorkingHoursObj.EndingHours = this.formValue.value.endingHours;
      this.api.UpdateIntern(this.internWorkingHoursObj)
      .subscribe(res=>{
        alert("Updated Successfully")
        let ref = document.getElementById('close');
        ref?.click();
        this.getInternWorkingDetails();
      })
    }
    onEdit(row : any){
      this.internWorkingHoursObj.Id = row.id;
      this.formValue.controls['internName'].setValue(row.internName);
      this.formValue.controls['companyHours'].setValue(row.companyHours);
      this.formValue.controls['internHours'].setValue(row.internHours);
      this.formValue.controls['endingHours'].setValue(row.endingHours);
      this.showUpdate = true;
      this.showAdd = false;
    }
  
    deleteInternWorkingDetail(row : any){
     let clickedYes = confirm("Are you sure want to delete");
     if(clickedYes){
      this.api.DeleteIntern(row.id)
      .subscribe(res=>{
        alert("Deleted Successfully");
        this.getInternWorkingDetails();
      })
     }
  }

}