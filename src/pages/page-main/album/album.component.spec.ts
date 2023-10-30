import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlbumService } from 'src/services/album.service';
import { AlbumComponent } from './album.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatHeaderRowDef, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTableModule } from '@angular/cdk/table';
import { TemplateMainComponent } from 'src/components/template-main/template-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const materialModules = [
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
];

fdescribe("AlbumComponent", () =>{
    let component: AlbumComponent;
    let el: HTMLElement;
    let fixture: ComponentFixture<AlbumComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AlbumService],
            imports:[
                HttpClientModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                ...materialModules
            ],
            declarations: [
                AlbumComponent,
                TemplateMainComponent
            ]
        });
        fixture = TestBed.createComponent(AlbumComponent);
        
        component = fixture.componentInstance;
        el = fixture.debugElement.nativeElement;
    });

    it("Should be created", () => {
        expect(component).toBeTruthy();
    });

    it("Should call inited function", () =>{
        const spyOnHandleFetchAlbum = spyOn(component, "handleFetchAlbum").and.callThrough();
        const spyOnHandleFetchAlbumCount = spyOn(component, "handleFetchAlbumCount").and.callThrough();
        component.ngOnInit();

        expect(spyOnHandleFetchAlbum).toHaveBeenCalled();
        expect(spyOnHandleFetchAlbumCount).toHaveBeenCalled();
    });

    it("Should next page", (done: DoneFn) => {
        const spyOnHandlePageEvent = spyOn(component, 'handlePageEvent').and.callThrough();
        component.ngOnInit();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let nextBtn = el.ownerDocument.querySelector(".mat-mdc-paginator-navigation-next");
            // console.log(nextBtn);
            // let body = el.ownerDocument.querySelector("table");
            // console.log(body);
            // console.log(component);
            (nextBtn as any).click();

            expect(spyOnHandlePageEvent).toHaveBeenCalled();
            done();
        });
    });
});