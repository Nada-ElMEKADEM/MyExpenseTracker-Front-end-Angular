// income.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Income } from '../../../models/income.model';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = 'http://localhost:8080/api/incomes';
  private userApiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient,
    private userService:UserService
  ) {}

  createIncome(income: Income): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      // Gérer le cas où le token est null
      console.error('Token not found');
      return of(null); // Vous pouvez également rediriger l'utilisateur vers la page de connexion ici
    }

    const decodedToken: any = jwtDecode(token);
    const email = decodedToken.sub;

    return this.getUserIdByEmail(email).pipe(
      switchMap((userId: number) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        income.userId = userId;
        return this.http.post<any>(this.apiUrl, income, { headers });
      })
    );
  }

  private getUserIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.userApiUrl}/id`, { params: { email } });
  }
  getIncomes(): Observable<Income[]> {
    const token = StorageService.getToken();
    if (!token) {
      // Gérer le cas où le token est null
      console.error('Token not found');
      return of([]); // Vous pouvez également rediriger l'utilisateur vers la page de connexion ici
    }
    const decodedToken: any = jwtDecode(token);
    const email = decodedToken.sub;

    return this.getUserIdByEmail(email).pipe(
      switchMap((userId: number) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        return this.http.get<Income[]>(`${this.apiUrl}/all/${userId}`, { headers });
      })
    );
  }
 
      deleteIncomeByTitle(title: string): Observable<void> {
        return this.getIncomeIdByTitle(title).pipe(
          switchMap((id: number) => this.deleteIncome(id))
        );
      }
    
      getIncomeIdByTitle(title: string): Observable<number> {
        const token = StorageService.getToken();
        if (!token) {
          console.error('Token not found');
          return of();
        }
    
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    
        return this.http.get<number>(`${this.apiUrl}/id`, { headers, params: { title } });
      }
    
      private deleteIncome(id: number): Observable<void> {
        const token = StorageService.getToken();
        if (!token) {
          console.error('Token not found');
          return of();
        }
    
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
      }
      ///////////


      getIncomeById(incomeId: number): Observable<Income> {
        const token = StorageService.getToken();
        if (!token) {
          console.error('Token not found');
          return of(null as any);
        }
    
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    
        return this.http.get<Income>(`${this.apiUrl}/${incomeId}`, { headers });
      }
    
      
    
      // Méthode pour mettre à jour un income
      updateIncome(incomeId: number, income: Income): Observable<any> {
        const token = StorageService.getToken();
        if (!token) {
          console.error('Token not found');
          return of(); // Vous pouvez également rediriger l'utilisateur vers la page de connexion ici
        }
    
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    
        return this.http.put<any>(`${this.apiUrl}/${incomeId}`, income, { headers });
      }
    
      

  
     
      
}
