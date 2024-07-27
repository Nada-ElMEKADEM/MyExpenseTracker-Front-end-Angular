import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user';
  

  constructor(private http: HttpClient) {}

  getUserIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/id?email=${email}`);
  }
  /*getUserNameByEmail(email: string): Observable<string | null> {
    const token = StorageService.getToken();
    if (!token) {
      console.error('Token not found');
      return of(null); // Gérer le cas où le token est null
    }

    /*const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<string>(`${this.apiUrl}/name?email=${email}`, { headers }).pipe(
      catchError(error => {
        console.error('Failed to fetch user name', error);
        return of(null); // Gérer les erreurs
      })
    );
    
  }*/
    getUserNameByEmail(email: string): Observable<string | null> {
      const token = StorageService.getToken();
      if (!token) {
        console.error('Token not found');
        return of(null);
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/plain' // Indicate that the expected response is plain text
      });
  
      // Ensure responseType is 'text' and type is correctly inferred
      return this.http.get(`${this.apiUrl}/name?email=${email}`, { headers, responseType: 'text' }).pipe(
        catchError(error => {
          console.error('Failed to fetch user name', error);
          return of(null); // Handle the error case and return null
        })
      ) as Observable<string | null>;
    }
    
}
