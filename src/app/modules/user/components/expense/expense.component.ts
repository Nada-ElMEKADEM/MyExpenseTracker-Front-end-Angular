import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm!: FormGroup;
  expenses: Expense[] = [];
 

  constructor(private fb: FormBuilder, private expenseService: ExpenseService,
    private message:NzMessageService,private router: Router 
  ) { }

  ngOnInit(): void {
    
    this.expenseForm = this.fb.group({
      title: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.loadExpenses();
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const newExpense: Expense = {
        title: this.expenseForm.value.title,
        amount: this.expenseForm.value.amount,
        date: this.expenseForm.value.date,
        category: this.expenseForm.value.category,
        description: this.expenseForm.value.description,
        userId: 0 // Initialize with a dummy value
      };

      this.expenseService.createExpense(newExpense).subscribe(
        response => {
          console.log('Expense created successfully', response);
          this.message.success("Expense created successfully",{nzDuration:5000});
          this.expenseForm.reset();
          this.loadExpenses();
        },
        error => {
          console.error('There was an error!', error);
          this.message.error("Something went wrong",{nzDuration:5000});
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(
      (data: Expense[]) => {
        this.expenses = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  onDeleteExpense(title: string): void {
    this.expenseService.deleteExpenseByTitle(title).subscribe(
      () => {
        console.log('Expense deleted successfully');
        this.message.success("Expense deleted successfully",{nzDuration:5000});
        this.loadExpenses();
      },
      error => {
        console.error('There was an error!', error);
        this.message.error("Something went wrong",{nzDuration:5000});
      }
    );}
    
    editExpense(title: string): void {
      console.log('Navigating to update-expense with title:', title);
      this.router.navigate(['/user/update-expense', title]);
    }
   
  
}
