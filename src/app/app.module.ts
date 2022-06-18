import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ScreenComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
