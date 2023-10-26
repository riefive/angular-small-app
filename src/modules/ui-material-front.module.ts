import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
];

@NgModule({
    imports: [...materialModules],
    exports: [...materialModules]
})
export class UiMaterialFontModule { }