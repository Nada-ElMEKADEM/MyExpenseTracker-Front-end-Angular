import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { Income } from '../../../../models/income.model';
import { Expense } from '../../../../models/expense.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'] // Correction de styleUrl à styleUrls
})
export class UserDashboardComponent implements OnInit {

  @ViewChild('incomeCanvas') private incomeCanvas!: ElementRef;
  @ViewChild('expenseCanvas') private expenseCanvas!: ElementRef;
  incomeChart: any;
  expenseChart: any;
  totalIncome: number = 0; // Propriété pour stocker le total des revenus
  totalExpense: number = 0; // Propriété pour stocker le total des dépenses
 
  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    
  ) {
    // Enregistrer tous les composants nécessaires de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.incomeService.getIncomes().subscribe((incomes: Income[]) => {
     this.totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
     console.log('Total Income:', this.totalIncome); 
      this.createIncomeChart(incomes);
    });
    this.expenseService.getExpenses().subscribe((expenses: Expense[]) => {
     this.totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0); // Calcul du total des dépenses
     console.log('Total Expense:', this.totalExpense); 
     this.createExpenseChart(expenses);
    });
  }

  createIncomeChart(incomes: Income[]): void {
    const labels = incomes.map(income => income.date);
    const data = incomes.map(income => income.amount);
    const canvas = this.incomeCanvas.nativeElement;

    this.incomeChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Incomes',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear',
          }
        }
      }
    });
  }

  createExpenseChart(expenses: Expense[]): void {
    const labels = expenses.map(expense => expense.date);
    const data = expenses.map(expense => expense.amount);
    const canvas = this.expenseCanvas.nativeElement;

    this.expenseChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Expenses',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear',
          }
        }
      }
    });
  }
}
