import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CryptoListComponent} from "./crypto-list/crypto-list.component";
import {CryptoDetailsComponent} from "./crypto-details/crypto-details.component";

const routes: Routes = [
  {path:'',redirectTo:'list',pathMatch:'full'},
  {path:'list',component:CryptoListComponent},
  {path:'details/:id',component:CryptoDetailsComponent   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
