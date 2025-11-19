import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-users-role-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './users-role-chart.html'
})
export class UsersRoleChartComponent implements OnChanges {

  @Input() users: any[] = [];

  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartData<'pie'> = {
    labels: ['Admins', 'Users'],
    datasets: [
      { data: [0, 0] }
    ]
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users'] && this.users?.length > 0) {
      const adminCount = this.users.filter(u => u.role === 'Admin').length;
      const userCount = this.users.filter(u => u.role === 'User').length;

      this.pieChartData = {
        labels: ['Admins', 'Users'],
        datasets: [
          { data: [adminCount, userCount] }
        ]
      };
    }
  }
}


