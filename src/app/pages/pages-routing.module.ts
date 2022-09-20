import { SelectedReservoirDashboardComponent } from './selected-reservoir-dashboard/selected-reservoir-dashboard.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddMaintainerComponent } from "./add-maintainer/add-maintainer.component";
import { AddReservoirComponent } from "./add-reservoir/add-reservoir.component";
import { DashboardComponent } from "./dashboards/dashboard.component";

import { DefaultComponent } from "./dashboards/default/default.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboards" },
  // { path: "dashboard", component: DashboardComponent },
  { path: "addReservoir", component: AddReservoirComponent },
  { path: "addMaintainer", component: AddMaintainerComponent },
  { path: "selectedReservoirDashboard", component: SelectedReservoirDashboardComponent },
  { path: "selectedReservoirDashboard/:id", component: SelectedReservoirDashboardComponent },

  {
    path: "dashboards",
    loadChildren: () =>
      import("./dashboards/dashboards.module").then((m) => m.DashboardsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
