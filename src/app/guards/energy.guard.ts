import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'

@Injectable()
export class EnergyGuard implements CanActivate {

	constructor(
		private authService : AuthService,
    private router:Router
	){}

	canActivate(
	    next: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			const userData=this.authService.getUserData();
			if(!userData){
				return false;
			}
			else{
					this.router.navigate(['session/login']);
				return false;
			}
	  	}
}
