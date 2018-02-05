import { Component, OnInit,NgZone } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {Employee} from "../../../model/Emp";
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { error } from 'selenium-webdriver';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 emp:Employee[]=[];

 p_firstname:string;
 p_lastname:string;
 p_comments:string;
 dtOptions: DataTables.Settings = {};
  
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  constructor(private http: Http) { 
    this.p_firstname="FNdfgdgAME";
    this.p_lastname="LNAME";
    this.p_comments="Comments";

  }
  form;

  public FormData:any={};
    ngOnInit():void {
    this.form=new FormGroup({
    firstName:new FormControl("",[Validators.required,Validators.minLength(3)]),
    comment:new FormControl(""),
    lastName:new FormControl("")
    });
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2
      };
      this.http.get('../../assets/data.json')
        .map(this.extractData)
        .subscribe(emp => {     
          this.emp = emp;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
    }

    private extractData(res: Response) {
      const body = res.json();
      return body.data || {};
    }


    senddata(data)
    {
      console.log(data);
      this.p_firstname=data.firstName;
      this.p_lastname=data.lastName;
      this.p_comments=data.comment;
    }
    SaveFormData(e)
    {
      console.log(e);
    }
  
    btnSave(){
      //this.postdataService.saveData().subscribe(res=>this.FormData=res);
      this.http.post('https://reqres.in/api/users',{name:"sunny",job:"Programmer",city:"Bangalore"})
          .map((res:Response)=>res.json)
          .catch(this._errorHandler);
      console.log("ASAVE");
    }
    private _errorHandler(error:Response)
    {
      console.log(error);
      return Observable.throw(error||'Some error occured');
    }
  
}
