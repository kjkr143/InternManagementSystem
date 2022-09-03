import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public loginAPIUrl : string = "https://localhost:44336/api/Login/";
  public internAPIUrl : string = "https://localhost:44336/api/Intern/";
  public designationAPIUrl : string = "https://localhost:44336/api/Designation/"
  public workingAPiUrl : string = "https://localhost:44336/api/WorkingHours/";
  public leavesAPIUrl : string = "https://localhost:44336/api/Leaves/";
  public statusAPIUrl : string = "https://localhost:44336/api/Status/"
  constructor(private _http : HttpClient) { }


  //Intern details Api crud operation
  PostIntern(data : any){
    return this._http.post<any>(`${this.internAPIUrl}add_Intern`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteIntern(id : number){
    return this._http.delete<any>(`${this.internAPIUrl}delete_intern/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateIntern(data : any){
    return this._http.put<any>(`${this.internAPIUrl}update_intern`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetInterns(){
    return this._http.get<any>(`${this.internAPIUrl}get_all_Intern`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }





  //Authentication verifcation api
  signUp(internObj : any){
    return this._http.post<any>(`${this.loginAPIUrl}signup`,internObj)
  }
  login(internObj:any){
    return this._http.post<any>(`${this.loginAPIUrl}login`,internObj)
  }





  //Designation Api crud operation

  PostWorkingDetails(data : any){
    return this._http.post<any>(`${this.workingAPiUrl}add_WorkingHours`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteWorkingDetails(id : number){
    return this._http.delete<any>(`${this.workingAPiUrl}delete_WorkingHours/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateWorkingDetails(data : any){
    return this._http.put<any>(`${this.workingAPiUrl}update_WorkingHours`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetWorkingHours(){
    return this._http.get<any>(`${this.workingAPiUrl}get_all_InternWorkingHours`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }






  //Designation APi crud operation
  PostDesignation(data : any){
    return this._http.post<any>(`${this.designationAPIUrl}add_Designation`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteDesignation(id : number){
    return this._http.delete<any>(`${this.designationAPIUrl}delete_designation/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateDesignation(data : any){
    return this._http.put<any>(`${this.designationAPIUrl}update_designation`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetDesignations(){
    return this._http.get<any>(`${this.designationAPIUrl}get_all_Designation`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }





  //Leaves API crud Operations
  PostInternLeaves(data : any){
    return this._http.post<any>(`${this.leavesAPIUrl}add_Leaves`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteInternLeaves(id : number){
    return this._http.delete<any>(`${this.leavesAPIUrl}delete_internLeaves/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateInternLeaves(data : any){
    return this._http.put<any>(`${this.leavesAPIUrl}update_internLeaves`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetInternLeaves(){
    return this._http.get<any>(`${this.leavesAPIUrl}get_all_InternLeaves`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }





  //Status API Crud operations

  PostInternStatus(data : any){
    return this._http.post<any>(`${this.statusAPIUrl}add_InternStatus`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteInternStatus(id : number){
    return this._http.delete<any>(`${this.statusAPIUrl}delete_InternStatus/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateInternStatus(data : any){
    return this._http.put<any>(`${this.statusAPIUrl}update_InternStatus`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetInternStatus(){
    return this._http.get<any>(`${this.statusAPIUrl}get_all_InternStatus`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
