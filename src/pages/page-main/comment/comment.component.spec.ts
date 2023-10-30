import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlbumService } from 'src/services/album.service';
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
import { CommentComponent } from './comment.component';
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

fdescribe("CommentComponent", () =>{
    let component: CommentComponent;
    let el: HTMLElement;
    let fixture: ComponentFixture<CommentComponent>;

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
                CommentComponent,
                TemplateMainComponent
            ]
        });

        fixture = TestBed.createComponent(CommentComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement.nativeElement;
    });

    it("Should be created", () => {
        expect(component).toBeTruthy();
    });

    it("Should call inited function", () =>{
        const spyOnHandleFetchComment = spyOn(component, "handleFetchComment").and.callThrough();
        const spyOnHandleFetchCommentCount = spyOn(component, "handleFetchCommentCount").and.callThrough();
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
});