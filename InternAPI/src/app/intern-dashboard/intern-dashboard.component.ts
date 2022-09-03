import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { InternModel } from './intern-dashboard.model';

@Component({
  selector: 'app-intern-dashboard',
  templateUrl: './intern-dashboard.component.html',
  styleUrls: ['./intern-dashboard.component.css']
})
export class InternDashboardComponent implements OnInit {

  
  formValue !: FormGroup;
  internData !: any;
  internObj : InternModel = new InternModel();
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
      email: [''],
      mobile: [''],
      address: [''] 
    })
    this.getInternDetails();
    this.role = localStorage.getItem('userType')!
  }
    clickAddIntern(){
      this.formValue.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }
    postInternDetails() {
      this.internObj.InternName = this.formValue.value.internName;
       this.internObj.Email = this.formValue.value.email;
       this.internObj.Mobile = this.formValue.value.mobile;
       this.internObj.Address = this.formValue.value.address;
      this.api.PostIntern(this.internObj)
        .subscribe(res => {
          console.log(res);
          let ref = document.getElementById('close');
        ref?.click();
        this.getInternDetails();
        })
    }
    getInternDetails() {
      this.api.GetInterns()
      .subscribe(res=>{
        this.internData = res.internDetails;
        
      })
    }
    editInternDetail(){
      this.internObj.InternName = this.formValue.value.internName;
      this.internObj.Email = this.formValue.value.email;
      this.internObj.Mobile = this.formValue.value.mobile;
      this.internObj.Address = this.formValue.value.address;
      this.api.UpdateIntern(this.internObj)
      .subscribe(res=>{
        alert("Updated Successfully")
        let ref = document.getElementById('close');
        ref?.click();
        this.getInternDetails();
      })
    }
    onEdit(row : any){
      this.internObj.Id = row.id;
      this.formValue.controls['internName'].setValue(row.internName);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['mobile'].setValue(row.mobile);
      this.formValue.controls['address'].setValue(row.address);
      this.showUpdate = true;
      this.showAdd = false;
    }
  
    deleteInternDetail(row : any){
     let clickedYes = confirm("Are you sure want to delete");
     if(clickedYes){
      this.api.DeleteIntern(row.id)
      .subscribe(res=>{
        alert("Deleted Successfully");
        this.getInternDetails();
      })
     }
  }

}


