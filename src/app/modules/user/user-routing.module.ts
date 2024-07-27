import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { UpdateIncomeComponent } from './components/update-income/update-income.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';

const routes: Routes = [
 {path:"dashboard",component :UserDashboardComponent},
 {path:"income",component:IncomeComponent},
 {path:"expense",component:ExpenseComponent},
 { path: 'update-income/:title', component: UpdateIncomeComponent } ,
 { path: 'update-expense/:title', component: UpdateExpenseComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
