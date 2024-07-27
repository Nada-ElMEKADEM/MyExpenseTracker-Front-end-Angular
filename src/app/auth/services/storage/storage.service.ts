import { Injectable } from '@angular/core';
//import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';


const TOKEN ="token";
const USER="user";



@Injectable({
  providedIn: 'root'
})
export class StorageService {
 

  constructor() { }
  static saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
  static saveUser(user:any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

 
  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

   static getUserRole():string{
    const user =this.getUser();
    if(user==null) return "";
    return user.role;
   }


   static isAdminLoggedIn():boolean{
    if(this.getToken()==null) return false;
    const role : string=this.getUserRole();
    return role =="ADMIN";
   }
   static isUserLoggedIn():boolean{
    if(this.getToken()==null) return false;
    const role : string=this.getUserRole();
    return role =="USER";
   }

   static logout():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER)

   }
   static getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // Ajoutez un log pour vérifier la structure du token
        return Number(decodedToken.userId);  // Assurez-vous que `userId` est le bon champ
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

}