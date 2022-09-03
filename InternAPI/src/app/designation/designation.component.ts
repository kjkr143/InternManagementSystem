import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { DesignationModel } from './designation.model';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  
  formValue !: FormGroup;
  designationData !: any;
  designationObj : DesignationModel = new DesignationModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  role:string =""
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      designtionName: [''],
      role: [''],
      departmentName: ['']
    })
    this.getDesignationDetails();
    this.role = localStorage.getItem('userType')!
  }
    clickAddDesignation(){
      this.formValue.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }
    postDesignationDetails() {
      this.designationObj.DesigntionName = this.formValue.value.designtionName;
       this.designationObj.Role = this.formValue.value.role;
       this.designationObj.DepartmentName = this.formValue.value.departmentName;
      this.api.PostDesignation(this.designationObj)
        .subscribe(res => {
          console.log(res);
          let ref = document.getElementById('close');
        ref?.click();
        this.getDesignationDetails();
        })
    }
    getDesignationDetails() {
      this.api.GetDesignations()
      .subscribe(res=>{
        this.designationData = res.designationDetails;
        
      })
    }
    editDesignationDetail(){
      this.designationObj.DesigntionName = this.formValue.value.designtionName;
      this.designationObj.Role = this.formValue.value.role;
      this.designationObj.DepartmentName = this.formValue.value.departmentName;
      this.api.UpdateDesignation(this.designationObj)
      .subscribe(res=>{
        alert("Updated Successfully")
        let ref = document.getElementById('close');
        ref?.click();
        this.getDesignationDetails();
      })
    }
    onEdit(row : any){
      this.designationObj.Id = row.id;
      this.formValue.controls['designtionName'].setValue(row.designtionName);
      this.formValue.controls['role'].setValue(row.role);
      this.formValue.controls['departmentName'].setValue(row.departmentName);
      this.showUpdate = true;
      this.showAdd = false;
    }
  
    deleteDesignationDetail(row : any){
     let clickedYes = confirm("Are you sure want to delete");
     if(clickedYes){
      this.api.DeleteDesignation(row.id)
      .subscribe(res=>{
        alert("Deleted Successfully");
        this.getDesignationDetails();
      })
     }
  }

}