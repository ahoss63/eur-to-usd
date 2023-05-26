import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EurUsdSwitchComponent } from './shared/components/eur-usd-switch/eur-usd-switch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversionHistoryComponent } from './shared/components/conversion-history/conversion-history.component';

@NgModule({
  declarations: [
    AppComponent,
    EurUsdSwitchComponent,
    HomeComponent,
    ConversionHistoryComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
