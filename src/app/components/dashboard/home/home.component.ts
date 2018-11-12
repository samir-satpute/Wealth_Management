import { Component, OnInit} from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Http, RequestOptions, Headers, Response, Request, RequestMethod } from '@angular/http'; 
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { SpinnerService } from '../../../services/spinner.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
 import 'devextreme/integration/jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  CompanyName:any;
  DepartureDate : any;
  recordData:any;
  updatedData:any;
  userInfo:Array<Object>;
    recordlist: Observable<any>;
 myInputVariable: any;
 companyId:any;
 updatedRow:any;
 recordId:any;
 specificData:any;
 recordDatabyId:any;
 detailsForm: FormGroup;
 ContactNumber:any;
 noLoanContingency: boolean=false;
 signature:boolean=false;
//  removalOfContingencies:boolean=false;
 title:String;
 filename:string;
 popupVisible = false;
 isAdd=false;
 showHeaderFilter: boolean;
 showFilterRow: boolean;
 aum:any;
 initial:any;
 
 public edited = false;
 
   constructor(private http: Http,public formBuilder:FormBuilder,
   public apisService:ApisService,
   public router:Router,
   public toastService:ToastService,
   private spinnerService : SpinnerService,
  private authService:AuthService) {
       this.showHeaderFilter = true;
         this.showFilterRow=true;
        
     
 
       this.detailsForm=formBuilder.group({
        // datePrepared: ["", Validators.required],
        // offerFrom: ["", Validators.required],
        propertyAddress: ["",Validators.required],
        // closeOfEscrow : ["", Validators.required],
        initialDeposit : ["", Validators.required],
        verificationOfFunds : ["", Validators.required],
        loanContingencyRemoval : ["", Validators.required],
        // noLoanContingency : ["", Validators.required]
        //inspectionContingency : ["", Validators.required],
        // removalOfContingencies : ["", Validators.required],  
        // agdate : ["", Validators.required],
        // name : ["", Validators.required],
        // signature : ["", Validators.required],
     });
     
    }
    RememberedData() {
        this.noLoanContingency = this.noLoanContingency;
        console.log(this.noLoanContingency)
      }
 
    onContentReady(e) {
          e.component.columnOption("command:edit", {
             visibleIndex: 0,
             width: 80
         });
     }
 
     onCellPrepared(e) {
         if (e.rowType === "data" && e.column.command === "edit") {
             var isEditing = e.row.isEditing,
                 $links = e.cellElement.find(".dx-link");
 
             $links.text("");
 
             if (isEditing) {
                 $links.filter(".dx-link-save").addClass("dx-icon-save");
                 $links.filter(".dx-link-cancel").addClass("dx-icon-revert");
             } else {
                 $links.filter(".dx-link-edit").addClass("dx-icon-edit");
                 $links.filter(".dx-link-delete").addClass("dx-icon-trash");
             }
         }
     }
 
 
 calculateCellValue(data) {
         return [data.CompanyType==1?"Corporate Company":"Travel Company"].join(" ");
     }
       
 
 
   listofRecords(){
    // this.spinnerService.displaySpinner(true);
    this.apisService.postData(null, 'getformdata').then((result) => {
        console.log("in listofRecord", result)
        this.recordData=result;
        if(this.recordData.status.code == 200){
            
        // var datePipe = new DatePipe("en-US");
        // this.recordData.result.forEach(element => {
        //    console.log("Date of Prepared",element.datePrepared) 
        //    element.datePrepared=datePipe.transform(element.datePrepared, 'yyyy-MM-dd');
        //    element.closeOfEscrow=datePipe.transform(element.closeOfEscrow, 'yyyy-MM-dd');
        // //    element.date=datePipe.transform(element.date, 'yyyy/MM/dd');
        // });

        // console.log("List of records in chamged format",this.recordData)
        
        // obj[key] = datePipe.transform(obj[key], 'dd-MMM-yyyy');
        // this.spinnerService.displaySpinner(false);
        //  this.recordlist=this.recordData;
         this.aum = this.recordData.result.aum;
         this.initial = this.recordData.result.initial;
        // console.log("listofRecords in home",this.recordlist);
    }
    else
    {
        // this.spinnerService.displaySpinner(false);
        this.toastService.showError("No Data");
    }
    });

  
 }
 
   ngOnInit() {
    this.listofRecords();
   }
 
  OpenPopupForSave() {
 this.isAdd=true;
  this.title="Add Details"
 this.popupVisible = true;
 
 }
 logEventInserting(e)
 {
    e.cancel = true;
 }
 RowRemoving(e)
 {
 //  debugger; 
 var messageForm:any={
     CompanyId:e.data._id
 }
//   this.apisService.RemoveCompanyByTM(messageForm).subscribe(res=>{ 
//       if(res.success){
            //    this.flashMessagesService.grayOut(true);
            //  this.flashMessagesService.show(res.message, {
            //    cssClass:'alert-success',
            //    timeout:3000});
        //     } 
        //    else
        //    {
            //     this.flashMessagesService.grayOut(true);
            //  this.flashMessagesService.show(res.message, {
            //    cssClass:'alert-danger',
            //    timeout:3000});
//            }
//            this.listofCompanies();
//   });
 }
 
 RowUpdated(e){
    // this.spinnerService.displaySpinner(true);
    this.recordDatabyId.id=  this.recordId,
    // this.recordDatabyId.datePrepared= (e.data.datePrepared==undefined?  this.recordDatabyId.datePrepared : e.data.datePrepared),
    // this.recordDatabyId.offerFrom= (e.data.offerFrom==undefined? this.recordDatabyId.offerFrom : e.data.offerFrom),
    this.recordDatabyId.propertyAddress= (e.data.propertyAddress==undefined? this.recordDatabyId.propertyAddress : e.data.propertyAddress),
    this.recordDatabyId.closeOfEscrow= (e.data.closeOfEscrow==undefined? this.recordDatabyId.closeOfEscrow : e.data.closeOfEscrow),
    this.recordDatabyId.initialDeposit= (e.data.initialDeposit==undefined? this.recordDatabyId.initialDeposit : e.data.initialDeposit),
    this.recordDatabyId.verificationOfFunds= (e.data.verificationOfFunds==undefined? this.recordDatabyId.verificationOfFunds :e.data.verificationOfFunds),
    this.recordDatabyId.loanContingencyRemoval=(e.data.loanContingencyRemoval==undefined? this.recordDatabyId.loanContingencyRemoval : e.data.loanContingencyRemoval),
    this.recordDatabyId.noLoanContingency= this.noLoanContingency,
    // this.recordDatabyId.inspectionContingency=(e.data.inspectionContingency==undefined? this.recordDatabyId.inspectionContingency : e.data.inspectionContingency),
    // this.recordDatabyId.removalOfContingencies= this.removalOfContingencies,
    // this.recordDatabyId.date= (e.data.agdate==undefined? this.recordDatabyId.date : e.data.agdate),
    // this.recordDatabyId.name= (e.data.name==undefined? this.recordDatabyId.name : e.data.name),
    // this.recordDatabyId.signature= this.signature
     
       console.log("Request in RowUpdated",this.recordDatabyId);
       console.log("highlighted",this.recordDatabyId.name);
     
     this.apisService.postData(this.recordDatabyId, 'AddUpdateFormData').then((result) => {
         console.log("Result in RowUpdated",result);
         this.updatedRow=result;
        if(this.updatedRow.status == 200){
            // this.spinnerService.displaySpinner(false);
            this.toastService.showSuccess("Record updated successfully");
              this.popupVisible = false;
           } 
          else{
            // this.spinnerService.displaySpinner(false);
           this.toastService.showError("Error: Something goes wrong");
          }
            this.listofRecords();
            });
//    this.apisService.editCompanyByTM(messageForm).subscribe(res => {
//     if(res.success){
        //  this.flashMessagesService.grayOut(true);
        //      this.flashMessagesService.show(res.message, {
        //        cssClass:'alert-success',
        //        timeout:3000});
    // }
              
               //this.popupVisible = false;
        //    else{
        //         this.flashMessagesService.grayOut(true);
        //      this.flashMessagesService.show(res.message, {
        //        cssClass:'alert-danger',
        //        timeout:3000});
        //    }
            
//              this.listofCompanies();
           
//   });
    // this.listofCompanies();
 }
 
 
 EditingStart(e){
    
     console.log("RowData",e.data);
     this.recordDatabyId=e.data;
    //  alert(e.data.id);
 this.recordId=e.data.id;
//  var dataId={
//     "id": this.recordId
//  }
//  this.apisService.postData(dataId, 'getformdatabyID').then((result) => {
//      this.specificData=result;
//      console.log("Particular record",this.specificData);
//     this.recordDatabyId=this.specificData.result;
//  });
//  this.recordDatabyId.name= (e.data.name==undefined? this.recordDatabyId.name : e.data.name),
//  console.log("Name",this.recordDatabyId.name);
//  this.CompanyName=e.data.CompanyName;
//  this.ContactNumber=e.data.ContactNumber;
 }
 
 SaveDetails() {
    debugger;
    // this.spinnerService.displaySpinner(true);
   if(this.isAdd===true)
   {
      var detailsForm : any = {
          "id":1,
    //    "datePrepared": this.detailsForm.value.datePrepared,
    //        "offerFrom": this.detailsForm.value.offerFrom,
            "aum": this.detailsForm.value.propertyAddress,
            "initial": this.detailsForm.value.initialDeposit,
        //    "propertyAddress": this.detailsForm.value.propertyAddress,
        //    "closeOfEscrow": this.detailsForm.value.closeOfEscrow,
        //    "initialDeposit": this.detailsForm.value.initialDeposit,
        //    "verificationOfFunds": this.detailsForm.value.verificationOfFunds,
        //    "loanContingencyRemoval": this.detailsForm.value.loanContingencyRemoval,
        //    "noLoanContingency": this.noLoanContingency,
        //    "inspectionContingency":this.detailsForm.value.inspectionContingency,
        //    "removalOfContingencies": this.removalOfContingencies
        //    "date": this.detailsForm.value.agdate,
        //    "name": this.detailsForm.value.name,
        // "signature": this.signature
       
     }

     console.log("detailsForm",detailsForm);
     this.apisService.postData(detailsForm, 'AddUpdateFormData').then((result) => {
         console.log("Result in home",result);
         this.updatedData=result;
         if(this.updatedData.flag){
            // this.spinnerService.displaySpinner(false);
            this.toastService.showSuccess("Form Saved successfully");
              this.popupVisible = false;
           } 
          else{
            // this.spinnerService.displaySpinner(false);
           this.toastService.showError("Error: Something goes wrong");
          }
            this.listofRecords();
            });
    }
    
    this.detailsForm.reset();
    this.popupVisible = false;
        // if (this.loginRes.status.code == "00") {
        //   this.dataService.setUserData(this.loginRes.result);
        //   this.dataService.UpdateUsername(this.loginRes.result[0].firstName);
        //   this.dataService.setFlag(true);
        //   this.dataService.setPopupFlag(true);
        //   this.router.navigate(['/admin/'], { relativeTo: this.route });
        // }
        // else {
        //   this.loginFlag = true;
        //   this.toastService.showError(this.loginRes.status.message);
        // }
      
 
//  this._dataService.createCompany(detailsForm).subscribe(res => {
//     if(res.success){
//         this.toastService.showSuccess(res.message);
//           this.popupVisible = false;
//        } 
//       else{
//        this.toastService.showError(res.message);
//       }
//         this.listofCompanies();
//       });
// }

this.detailsForm.reset();
this.popupVisible = false;
 }
 Close()
 {
    this.detailsForm.reset();
   this.popupVisible = false;
   this.isAdd=false;
 }

 onDepartureDate(departureDate)
 {
   
     this.DepartureDate=departureDate;
    
 }
 }
 
 
 
 
 