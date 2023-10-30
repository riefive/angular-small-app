import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostComponent } from './post.component';
import { TemplateMainComponent } from 'src/components/template-main/template-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumService } from 'src/services/album.service';

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

fdescribe("PostComponent", () =>{
    let component: PostComponent;
    let el: HTMLElement;
    let fixture: ComponentFixture<PostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlbumService
            ],
            imports:[
                HttpClientModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                ...materialModules
            ],
            declarations: [
                PostComponent,
                TemplateMainComponent
            ]
        });

        fixture = TestBed.createComponent(PostComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement.nativeElement;
    });

    it("Should be created", () => {
        expect(component).toBeTruthy();
    });

    it("Should call inited function", () =>{
        const spyOnHandleFetchComment = spyOn(component, "handleFetchPost").and.callThrough();
        const spyOnHandleFetchCommentCount = spyOn(component, "handleFetchPostCount").and.callThrough();
        component.ngOnInit();

        expect(spyOnHandleFetchComment).toHaveBeenCalled();
        expect(spyOnHandleFetchCommentCount).toHaveBeenCalled();
    });

    it("Should next page", (done: DoneFn) => {
        const spyOnHandlePageEvent = spyOn(component, 'handlePageEvent').and.callThrough();
        component.ngOnInit();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let nextBtn = el.ownerDocument.querySelector(".mat-mdc-paginator-navigation-next");
            (nextBtn as any).click();
            expect(spyOnHandlePageEvent).toHaveBeenCalled();
            done();
        });
    });

    it("Should call page add", (done: DoneFn) => { 
        const spyOnHandleClickAdd = spyOn(component, 'handleClickAdd').and.callThrough();
        component.ngOnInit();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const buttonAdd = el.ownerDocument.querySelector('#add-post');
            if (buttonAdd) (buttonAdd as any).click()
            expect(spyOnHandleClickAdd).toHaveBeenCalled();
            done();
        });
    });
});