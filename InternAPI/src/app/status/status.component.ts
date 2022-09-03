import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StatusModel } from './status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  formValue !: FormGroup;
  internStatusData !: any;
  internStatusObj : StatusModel = new StatusModel();
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
      status: [''],
    })
    this.getInternStatusDetails();
    this.role = localStorage.getItem('userType')!
  }
  clickAddStatus(){
      this.formValue.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }
    postInternStatusDetails() {
      this.internStatusObj.InternName = this.formValue.value.internName;
      this.internStatusObj.Status = this.formValue.value.status;
      this.api.PostInternStatus(this.internStatusObj)
        .subscribe(res => {
          console.log(res);
          let ref = document.getElementById('close');
        ref?.click();
        this.getInternStatusDetails();
        })
    }
    getInternStatusDetails() {
      this.api.GetInternStatus()
      .subscribe(res=>{
        this.internStatusData = res.internStatusDetails;
        
      })
    }
    editInternStatusDetail(){
      this.internStatusObj.InternName = this.formValue.value.internName;
      this.internStatusObj.Status = this.formValue.value.status;
      this.api.UpdateInternStatus(this.internStatusObj)
      .subscribe(res=>{
        alert("Updated Successfully")
        let ref = document.getElementById('close');
        ref?.click();
        this.getInternStatusDetails();
      })
    }
    onEdit(row : any){
      this.internStatusObj.Id = row.id;
      this.formValue.controls['internName'].setValue(row.internName);
      this.formValue.controls['status'].setValue(row.status);
      this.showUpdate = true;
      this.showAdd = false;
    }
  
    deleteInternStatusDetail(row : any){
     let clickedYes = confirm("Are you sure want to delete");
     if(clickedYes){
      this.api.DeleteInternStatus(row.id)
      .subscribe(res=>{
        alert("Deleted Successfully");
        this.getInternStatusDetails();
      })
     }
  }

}
