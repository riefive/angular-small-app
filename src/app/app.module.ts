import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from 'src/modules/routing.module';
import { UiMaterialFontModule } from 'src/modules/ui-material-front.module';
import { TemplateAuthComponent } from 'src/components/template-auth/template-auth.component';
import { TemplateMainComponent } from 'src/components/template-main/template-main.component';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    UiMaterialFontModule,
    RoutingModule
  ],
  providers: [],
  declarations: [	
    AppComponent, TemplateAuthComponent, TemplateMainComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
