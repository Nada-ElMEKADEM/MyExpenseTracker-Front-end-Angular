import { Component, OnInit } from '@angular/core';
import { Income } from '../../../../models/income.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss']
})
export class UpdateIncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  title!: string;
  incomeId!: number;
  userId!: number; // Ajouter la variable pour stocker userId

  constructor(
    private fb: FormBuilder,
    private incomeService: IncomeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Use snapshot to get the title from the route parameters
    this.title = this.route.snapshot.paramMap.get('title')!;
    console.log('Received title:', this.title); 
    
    // Retrieve the ID of the Income based on the title
    this.incomeService.getIncomeIdByTitle(this.title).subscribe(
      (id: number) => {
        this.incomeId = id;
        
        // Use the ID to fetch the Income details and pre-fill the form
        this.incomeService.getIncomeById(this.incomeId).subscribe(
          (income: Income) => {
            this.userId = income.userId; // Store userId
            this.incomeForm = this.fb.group({
              title: [income.title, [Validators.required]],
              amount: [income.amount, [Validators.required]],
              date: [income.date, [Validators.required]],
              category: [income.category, [Validators.required]],
              description: [income.description, [Validators.required]]
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
    if (this.incomeForm.valid) {
      const updatedIncome: Income = {
        title: this.incomeForm.value.title,
        amount: this.incomeForm.value.amount,
        date: this.incomeForm.value.date,
        category: this.incomeForm.value.category,
        description: this.incomeForm.value.description,
        userId: this.userId // Conserver le userId lors de la mise à jour
      };

      this.incomeService.updateIncome(this.incomeId, updatedIncome).subscribe(
        response => {
          console.log('Income updated successfully', response);
          this.router.navigate(['user/income']); // Rediriger après la mise à jour
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

