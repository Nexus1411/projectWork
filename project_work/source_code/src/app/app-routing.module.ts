// Implements all routes of the application
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile/profile.component";

const appRoutes: Routes=[
    {path:'', component:AuthComponent},
    {path:'auth', component:AuthComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'profile', component:ProfileComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}