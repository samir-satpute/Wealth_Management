import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { ApisService } from '../../services/apis.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData:any;
  teamLeader:boolean;
  employee:boolean;
  admin:boolean
    constructor(private router:Router,
    private authService:AuthService,
    private apisService:ApisService,
    public toastService:ToastService) {
       this.teamLeader=false;
       this.employee=false;
       this.admin=false;
      }
  
    ngOnInit() {
      // this.userData = this.authService.getUserData();
      
      // if(this.userData.Type!=="CC"){
      //   this.router.navigate(['']);
      // }
      // if(this.userData.Role==2)
      // {
      //    this.teamLeader=true;
      //     this.employee=false;
      //  this.admin=false;
      // }
      // else if(this.userData.Role==3){
      //    this.employee=true;
      //    this.teamLeader=false;
      //  this.admin=false;
      // }
      // else{
      //    this.admin=true;
      //    this.teamLeader=false;
      //  this.employee=false;
      // }
    }
  
  
    onLogoutClick(){
      this.authService.logoutUser();
      this.toastService.showSuccess("Logged Out Successfully");
      this.router.navigate(['']);
       return false;
    }
  
  }
  
