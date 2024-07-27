import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzAutosizeDirective } from 'ng-zorro-antd/input';
import { NzOptionComponent} from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgZorroAntdModules } from '../../ngZorroantdmodules';
import { UpdateIncomeComponent } from './components/update-income/update-income.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';



@NgModule({
  declarations: [
    UserDashboardComponent,
    IncomeComponent,
    ExpenseComponent,
    UpdateIncomeComponent,
    UpdateExpenseComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzCardComponent,
    NzFormItemComponent,
    NzFormModule,
    ReactiveFormsModule,
    NzAutosizeDirective,
    NzOptionComponent,
    NzDatePickerModule,
    NzButtonModule,
    NzSelectModule,
    NgZorroAntdModules,
    
   
  

  
  ]
})
export class UserModule { }
