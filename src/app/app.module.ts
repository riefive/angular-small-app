import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout'
import { AppRoutingModule } from './app-routing.module';
import { UiMaterialFontModule } from 'src/modules/ui-material-front.module';
import { TemplateAuthComponent } from 'src/components/template-auth/template-auth.component';
import { TemplateMainComponent } from 'src/components/template-main/template-main.component';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    UiMaterialFontModule
  ],
  providers: [],
  declarations: [	
    AppComponent, TemplateMainComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
