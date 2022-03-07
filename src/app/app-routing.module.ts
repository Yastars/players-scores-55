import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { PlayersScoresResolver } from './resolvers/players-scores.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    resolve: {
      routeResolver: PlayersScoresResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
