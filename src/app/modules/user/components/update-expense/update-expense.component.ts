import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../../../../models/expense.model';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.scss'
})
export class UpdateExpenseComponent {
  expenseForm!: FormGroup;
  title!: string;
  expenseId!: number;
  userId!: number; // Ajouter la variable pour stocker userId

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Use snapshot to get the title from the route parameters
    this.title = this.route.snapshot.paramMap.get('title')!;
    console.log('Received title:', this.title); 
    
    // Retrieve the ID of the Income based on the title
    this.expenseService.getExpenseIdByTitle(this.title).subscribe(
      (id: number) => {
        this.expenseId = id;
        
        // Use the ID to fetch the Income details and pre-fill the form
        this.expenseService.getExpenseById(this.expenseId).subscribe(
          (expense: Expense) => {
            this.userId = expense.userId; // Store userId
            this.expenseForm = this.fb.group({
              title: [expense.title, [Validators.required]],
              amount: [expense.amount, [Validators.required]],
              date: [expense.date, [Validators.required]],
              category: [expense.category, [Validators.required]],
              description: [expense.description, [Validators.required]]
            });
          },
          error => {
            console.error('There was an error!', error);
          }
        );
      },
      error => {
        console.error('There was an error retrieving income ID!', error);
      }
    );
  }


  onSubmit(): void {
    if (this.expenseForm.valid) {
      const updatedExpense: Expense = {
        title: this.expenseForm.value.title,
        amount: this.expenseForm.value.amount,
        date: this.expenseForm.value.date,
        category: this.expenseForm.value.category,
        description: this.expenseForm.value.description,
        userId: this.userId // Conserver le userId lors de la mise à jour
      };

      this.expenseService.updateExpense(this.expenseId, updatedExpense).subscribe(
        response => {
          console.log('Expense  updated successfully', response);
          this.router.navigate(['user/expense']); // Rediriger après la mise à jour
        },
        error => {
          console.error('There was an error!', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
