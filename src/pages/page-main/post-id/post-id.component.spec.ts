/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PostIdComponent } from './post-id.component';
import { TemplateMainComponent } from 'src/components/template-main/template-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostService } from 'src/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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

fdescribe('PostIdComponent', () => {
    let component: PostIdComponent;
    let el: HTMLElement;
    let fixture: ComponentFixture<PostIdComponent>;
    let route: ActivatedRoute;

    const paramsSubject = new BehaviorSubject({ id: 1 } as any);

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PostService,
          /*
          {
            provide: ActivatedRoute,
            useValue: {
              params: paramsSubject
            },
          },
          */
        ],
        imports:[
            HttpClientModule,
            BrowserAnimationsModule,
            RouterTestingModule,
            FormsModule,
            ReactiveFormsModule,
            ...materialModules
        ],
        declarations: [ PostIdComponent, TemplateMainComponent ]
      })
      //.compileComponents();
      // route = TestBed.inject(ActivatedRoute);
    });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostIdComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be new', (done) => { 
    paramsSubject.next({ id: 'create' });
    done();
    /*
    route.paramMap.subscribe((params: any) => {
      expect(params.id).toBe('create');
    });
    */
  });

  it("Should call add click", (done: DoneFn) => { 
    const spyOnHandleSubmit = spyOn(component, 'handleSubmit').and.callThrough();
    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
        fixture.detectChanges();
        const myId = el.ownerDocument.querySelector('#my-id')
        const myUseId = el.ownerDocument.querySelector('#my-userid')
        const myTitle = el.ownerDocument.querySelector('#my-title')
        const myBody = el.ownerDocument.querySelector('#my-body')
        const buttonSubmit = el.ownerDocument.querySelector('#my-button-submit');
        if (myId) myId.setAttribute('value', '1')
        if (myUseId) myUseId.setAttribute('value', '1')
        if (myTitle) myTitle.setAttribute('value', 'Lorem')
        if (myBody) myBody.setAttribute('value', 'Lorem Ipsum')
        if (buttonSubmit) (buttonSubmit as any).click()
        expect(spyOnHandleSubmit).toHaveBeenCalled();
        done();
    });
});
});
