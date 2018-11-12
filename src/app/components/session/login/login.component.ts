import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApisService } from '../../../services/apis.service';
import { ToastService } from '../../../services/toast.service';
import { SpinnerService } from '../../../services/spinner.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  userData:any;
  companyData:any;
  errmsg:string;
  constructor(
    private spinnerService : SpinnerService,
    private fb : FormBuilder,
    private authService : AuthService,
    private apisService : ApisService,
    public toastService:ToastService,
    private router : Router){
    this.loginForm = fb.group({
        'email' : [null,],
        'password': [null,],
      });
    }

    submitForm(value: any){
      // this.spinnerService.displaySpinner(true);
      const user = {
        'Email' : value.email,
        'Password' : value.password
      }
      // if(value.email=='energy@gmail.com' && value.password=='winjit@123')
      // {
      this.authService.setUserData(user);
      this.router.navigate(['/dashboard/home']);
      // this.spinnerService.displaySpinner(false);
          this.toastService.showSuccess("Login Successful");
      
      // }
      // else{
       
      // this.router.navigate(['/session/login']);
      // this.spinnerService.displaySpinner(false);
      //     this.toastService.showError("Invalid Credentials");
      // }

      // this.apiService.postData(this.cryptoService.encryptData(this.loginData), 'adminapi/signIn').then((result) => {
      //   this.loginRes = result
      //   if (this.loginRes.status.code == "00") {
      //     this.dataService.setUserData(this.loginRes.result);
      //     this.dataService.UpdateUsername(this.loginRes.result[0].firstName);
      //     this.dataService.setFlag(true);
      //     this.dataService.setPopupFlag(true);
      //     this.router.navigate(['/admin/'], { relativeTo: this.route });
      //   }
      //   else {
      //     this.loginFlag = true;
      //     this.toastService.showError(this.loginRes.status.message);
      //   }
      // })

      // this.apisService.corporateCompanyUserLogin(user)
      //     .subscribe(data => {
      //       this.scrollWin();
      //     if(data.success){
      //       this.authService.setUserToken(data.data.Token);
      //       delete data.data.Token;
      //       data.data.Type="CC";
      //       this.authService.setUserData(data.data);
      //         if(data.data.Role==1)
      //         {
      //            var companyId:any={
      //         CompanyId:data.data.CompanyId._id
      //       }
      //           this.apisService.getUpdatedCompanyData(companyId)
      //     .subscribe(res => {this.companyData=res.data;
      //       this.authService.setCompanyData(this.companyData);
      //   //  console.log(this.companyData);
              
      //         });
      //         }
            
      //       this.router.navigate(['/dashboard/home']);
      //       this.flashMessagesService.grayOut(true);
      //       this.flashMessagesService.show(data.message, {
      //         cssClass:'alert-success',
      //         timeout:3000});
      //     }else{
            
      //       this.errmsg=data.message;
      //       this.flashMessagesService.grayOut(true);
      //       this.flashMessagesService.show(data.message, {
      //         cssClass:'alert-danger',
      //         timeout:3000});
      //         this.router.navigate(['session/login']);
      //     }
      //   });
      }
      scrollWin() {
    window.scrollTo(0, 0);
}

  ngOnInit() {
    // this.userData = this.authService.getUserData();
    // if(this.userData){
    //   this.router.navigate(['/dashboard/home']);
    // }
  }
}
