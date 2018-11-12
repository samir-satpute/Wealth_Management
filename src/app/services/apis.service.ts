
import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../services/spinner.service';



@Injectable()
export class ApisService {

	// baseUrl:String="http://ec2-34-201-113-69.compute-1.amazonaws.com:5011/home/"
	baseUrl:String="http://ec2-54-86-110-104.compute-1.amazonaws.com:5011/home/"   // change URL
	// baseUrl:String='http://winjitstaging.cloudapp.net:5011/home/';
  //baseUrl:String='http://localhost:4300/api/';
  //baseUrl:String='http://192.168.9.15:6003/api/';
  //baseUrl: String = 'http://192.168.9.86:6003/';
  userData: any;
	userInfo: any;
	sessionFlag:boolean=false;
  constructor(private http: Http,
		public toastService: ToastService,
		public router: Router,
		public spinnerService: SpinnerService

	) { }

   /**
	 * This is common function to call(post) api & send response.
	 * @param credentials - required data to call api
	 * @param apiName - Name of api to be called
	 */

	postData(credentials, apiName) {
		// this.spinnerService.displaySpinner(true);
		// if (this.dataService.checkNetwokStatus()) {
			
			return new Promise((resolve, reject) => {
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				this.http.post(this.baseUrl + apiName, credentials, { headers: headers }).subscribe(res => {
					console.log("Response",res.status)
					if (res.status != 200) {

						//.log(res);
						// this.spinnerService.displaySpinner(false);
						return reject(res);
					}
					// this.userInfo = res.json()
					this.userInfo = res.json()
					console.log(this.userInfo)
					// this.userData = this.cryptoService.decryptData(this.userInfo.encResponse);
					//console.log(this.userData);
					/**
						* Here we are checking response of api service.
						*/
					if (this.userInfo.status.code == '200') {
						// this.toastService.showError("Hello")
						// if (this.userData.token)
							// this.dataService.setUserToken(this.userData.token.token);
						// console.log(this.userData.token.token)
						var data = {
							flag: true,
							result: this.userInfo.result,
							status: this.userInfo.status
						}
						//  this.spinnerService.displaySpinner(false);
						resolve(data)
					}
					// else if (!this.sessionFlag && this.userData.status.code == '03') {

					// 	// console.log("session exp")
					// 	this.sessionFlag=true;						
					// 	this.dataService.logoutUser();
					// 	window.location.reload();
					// 	this.spinnerService.displaySpinner(false);
					// 	this.router.navigate(['/session']);
					// 	this.toastService.showError(this.userData.status.message)
					// }
					// else if(this.userData.status.code == '02') {
					// 	var data = {
					// 		flag: false,
					// 		result: this.userData.result,
					// 		status: this.userData.status
					// 	}
					// 	this.spinnerService.displaySpinner(false);
					// 	resolve(data)
					// 	return false;
					// }
					else {
						var data = {
							flag: false,
							result: this.userInfo.result,
							status: this.userInfo.status
						}
						this.spinnerService.displaySpinner(false);
						resolve(data)
						return false;
					}
				},
					//Handling error
					(err) => {
						//  console.log("http error"+err)
						//  this.spinnerService.displaySpinner(false);
						this.toastService.showError("Sorry, the server is extra busy and working hard! Please try again in a few minutes! Thank you! :-)");
						this.spinnerService.displaySpinner(false);
						reject(err);

					})
			})
		// }
		// else {
		// 	this.spinnerService.displaySpinner(false);
		// 	this.toastService.showError("No internet connection");
		// }
	
	}

	postData1(credentials, apiName){
		return this.http.post(this.baseUrl + apiName, credentials)
		.map(res => res)
		.catch(this.handleErrorObservable);
	  }

	  private handleErrorObservable(error: Response | any) {
		// 401 - unAuthorized
	
		if (error.status === 401) {
		  var message = "error";
		  // this._tostrservice.showCustom();
		  return Observable.throw(new Error(error.message));
		  // alert("Server error please try again!");
		}
		// 500 - internal server error
		else if (error.status === 500) {
		  return Observable.throw(new Error(error.message));
		}
		// 400 - bad request
		else if (error.status === 400) {
		  return Observable.throw(new Error(error.message));
		}
		// 409 - conflict
		else if (error.status === 409) {
		  return Observable.throw(new Error(error.message));
		}
		// 408 - request timeout
		else if (error.status === 408) {
		  return Observable.throw(new Error(error.message));
		}
		else {
		  // console.error(error.message || error);
		  return Observable.throw(error.message || error);
		}
	
	  }
}