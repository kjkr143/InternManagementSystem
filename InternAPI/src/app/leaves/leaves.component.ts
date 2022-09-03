import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { LeaveModel } from './leaves.model';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {

  formValue !: FormGroup;
  internLeavesData !: any;
  internLeavesObj : LeaveModel = new LeaveModel();
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
      startDate: [''],
      lastDate: ['']
    })
    this.getInternLeavesDetails();
    this.role = localStorage.getItem('userType')!
  }
  clickAddLeaves(){
      this.formValue.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }
    postInternLeavesDetails() {
      this.internLeavesObj.InternName = this.formValue.value.internName;
      this.internLeavesObj.StartDate = this.formValue.value.startDate;
      this.internLeavesObj.LastDate = this.formValue.value.lastDate;
      this.api.PostInternLeaves(this.internLeavesObj)
        .subscribe(res => {
          console.log(res);
          let ref = document.getElementById('close');
        ref?.click();
        this.getInternLeavesDetails();
        })
    }
    getInternLeavesDetails() {
      this.api.GetInternLeaves()
      .subscribe(res=>{
        this.internLeavesData = res.leavesDetails;
        
      })
    }
    editInternLeavesDetail(){
      this.internLeavesObj.InternName = this.formValue.value.internName;
      this.internLeavesObj.StartDate = this.formValue.value.startDate;
      this.internLeavesObj.LastDate = this.formValue.value.lastDate;
      this.api.UpdateInternLeaves(this.internLeavesObj)
      .subscribe(res=>{
        alert("Updated Successfully")
        let ref = document.getElementById('close');
        ref?.click();
        this.getInternLeavesDetails();
      })
    }
    onEdit(row : any){
      this.internLeavesObj.Id = row.id;
      this.formValue.controls['internName'].setValue(row.internName);
      this.formValue.controls['startDate'].setValue(row.startDate);
      this.formValue.controls['lastDate'].setValue(row.lastDate);
      this.showUpdate = true;
      this.showAdd = false;
    }
  
    deleteInternLeavesDetail(row : any){
     let clickedYes = confirm("Are you sure want to delete");
     if(clickedYes){
      this.api.DeleteInternLeaves(row.id)
      .subscribe(res=>{
        alert("Deleted Successfully");
        this.getInternLeavesDetails();
      })
     }
  }

}
