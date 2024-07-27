import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Route, Router } from '@angular/router';
import { UserService } from './modules/user/services/user.service';
import { jwtDecode } from 'jwt-decode';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myExpenseTracker';
  isUserLoggedIn: boolean = StorageService.isUserLoggedIn();
  isAdminLoggedIn: boolean =StorageService.isAdminLoggedIn();
  userName: string | null = null;

  constructor(private router:Router,private userService: UserService){}

 /*ngOnInit(){
    this.router.events.subscribe(event =>{
      if(event.constructor.name==="NavigationEnd"){
        this.isAdminLoggedIn=StorageService.isAdminLoggedIn();
        this.isUserLoggedIn=StorageService.isUserLoggedIn();
      }
      

    })
  }*/

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
  
  ngOnInit(): void {
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
    if (this.isUserLoggedIn) {
      const token = StorageService.getToken();
      
      if (token) { // Vérifiez que le token n'est pas null
        try {
          const decodedToken: any = jwtDecode(token);
          const email = decodedToken.sub;

          // Ajoutez un log pour vérifier le contenu de `email`
          console.log('Decoded email:', email);

          this.userService.getUserNameByEmail(email).subscribe(
            name => {
              this.userName = name;
              console.log('User name:', name);
            },
            error => {
              console.error('Failed to fetch user name', error);
            }
          );
        } catch (e) {
          console.error('Failed to decode token', e);
        }
      } else {
        console.error('Token is null');
      }
    } else {
      console.error('User is not logged in');
    }
  }


}
