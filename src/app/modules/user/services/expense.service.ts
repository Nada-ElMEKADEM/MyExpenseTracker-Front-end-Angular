import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Expense } from '../../../models/expense.model';
import { Observable, of, switchMap } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:8080/api/expenses';
  private userApiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient,
    private userService:UserService
  ) {}

  createExpense(expense: Expense): Observable<any> {
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

        expense.userId = userId;
        return this.http.post<any>(this.apiUrl, expense, { headers });
      })
    );
  }

  private getUserIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.userApiUrl}/id`, { params: { email } });
  }
  getExpenses(): Observable<Expense[]> {
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

        return this.http.get<Expense[]>(`${this.apiUrl}/all/${userId}`, { headers });
      })
    );
  }

  deleteExpenseByTitle(title: string): Observable<void> {
    return this.getExpenseIdByTitle(title).pipe(
      switchMap((id: number) => this.deleteExpense(id))
    );
  }

  getExpenseIdByTitle(title: string): Observable<number> {
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

  private deleteExpense(id: number): Observable<void> {
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


  getExpenseById(expenseId: number): Observable<Expense> {
    const token = StorageService.getToken();
    if (!token) {
      console.error('Token not found');
      return of(null as any);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Expense>(`${this.apiUrl}/${expenseId}`, { headers });
  }

  

  // Méthode pour mettre à jour un income
  updateExpense(expenseId: number, expense: Expense): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      console.error('Token not found');
      return of(); // Vous pouvez également rediriger l'utilisateur vers la page de connexion ici
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.apiUrl}/${expenseId}`, expense, { headers });
  }

}
