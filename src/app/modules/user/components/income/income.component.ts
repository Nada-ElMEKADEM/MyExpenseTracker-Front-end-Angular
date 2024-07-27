// income.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../../../models/income.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  incomes: Income[] = [];
 

  constructor(private fb: FormBuilder, private incomeService: IncomeService,
    private message:NzMessageService,private router: Router 
  ) { }

  ngOnInit(): void {
    
    this.incomeForm = this.fb.group({
      title: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.loadIncomes();
  }

  onSubmit(): void {
    if (this.incomeForm.valid) {
      const newIncome: Income = {
        title: this.incomeForm.value.title,
        amount: this.incomeForm.value.amount,
        date: this.incomeForm.value.date,
        category: this.incomeForm.value.category,
        description: this.incomeForm.value.description,
        userId: 0 // Initialize with a dummy value
      };

      this.incomeService.createIncome(newIncome).subscribe(
        response => {
          console.log('Income created successfully', response);
          this.message.success("Income created successfully",{nzDuration:5000});
          this.incomeForm.reset();
          this.loadIncomes();
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
  loadIncomes(): void {
    this.incomeService.getIncomes().subscribe(
      (data: Income[]) => {
        this.incomes = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  onDeleteIncome(title: string): void {
    this.incomeService.deleteIncomeByTitle(title).subscribe(
      () => {
        console.log('Income deleted successfully');
        this.message.success("Income deleted successfully",{nzDuration:5000});
        this.loadIncomes();
      },
      error => {
        console.error('There was an error!', error);
        this.message.error("Something went wrong",{nzDuration:5000});
      }
    );}
    
    editIncome(title: string): void {
      console.log('Navigating to update-income with title:', title);
      this.router.navigate(['/user/update-income', title]);
    }
   
  }
