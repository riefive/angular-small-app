/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, inject, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Location } from "@angular/common";
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
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostComponent } from '../post/post.component';

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
    let app: any
    let el: HTMLElement;
    let fixture: ComponentFixture<PostIdComponent>;
    let router: Router;
    let location: Location;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PostService
        ],
        imports:[
            HttpClientModule,
            BrowserAnimationsModule,
            RouterTestingModule,
            FormsModule,
            ReactiveFormsModule,
            RouterTestingModule.withRoutes([
              { path: 'post', component: PostComponent },
              { path: 'post/:id', component: PostIdComponent }
            ]),
            ...materialModules
        ],
        declarations: [ PostIdComponent, TemplateMainComponent ]
      })
      //.compileComponents();
    });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostIdComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router)
    location = TestBed.inject(Location);
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate to post v1', fakeAsync(() => {
    router.navigate(['/post']);
    tick();
    expect(location.path()).toBe('/post')
  }))

  it('Should navigate to post v2', fakeAsync(() => {
    component.handleButtonClick('cancel');
    tick()
    expect(location.path()).toBe('/post')
  }))

  it('Should submit created', inject([Router], (mockRouter: Router) => {
    component.mode = 'add'
    component.form.get('id')?.setValue(1)
    component.form.get('userId')?.setValue(1)
    component.form.get('title')?.setValue('lorem ipsum')
    component.form.get('body')?.setValue('lorem ipsum')
    const buttonSubmit = el.ownerDocument.querySelector('#my-button-submit');
    // const spyNavigate = spyOn(mockRouter, 'navigateByUrl').and.stub();

    fixture.whenStable().then(() => {
      if (buttonSubmit) (buttonSubmit as any).click()
      expect(buttonSubmit?.getAttribute('type')).toBe('submit')
      // expect(spyNavigate).toHaveBeenCalled()
    });
  }));

  it('Should submit edited', (done: DoneFn) => {
    component.mode = 'edit'
    component.detailId = 1
    component.form.get('id')?.setValue(1)
    component.form.get('userId')?.setValue(1)
    component.form.get('title')?.setValue('lorem ipsum')
    component.form.get('body')?.setValue('lorem ipsum')
    const buttonSubmit = el.ownerDocument.querySelector('#my-button-submit');

    fixture.whenStable().then(() => {
      if (buttonSubmit) (buttonSubmit as any).click()
      expect(buttonSubmit?.getAttribute('type')).toBe('submit')
      done()
    });
  });

  it('Should call handle get one', (done: DoneFn) => {
    component.mode = 'edit'
    component.detailId = 1
    const spyOnHandleGetOne = spyOn(component, 'handleGetOne').and.callThrough();
    fixture.whenStable().then(() => {
      component.handleGetOne()
      expect(spyOnHandleGetOne).toHaveBeenCalled();
      done();
    });
  });

  it('Should call add click', (done: DoneFn) => { 
    const spyOnHandleSubmit = spyOn(component, 'handleSubmit').and.callThrough();
    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
        fixture.detectChanges();
        component.mode = 'edit'
        component.detailId = 1
        const myId = el.ownerDocument.querySelector('#my-id')
        const myUseId = el.ownerDocument.querySelector('#my-userid')
        const myTitle = el.ownerDocument.querySelector('#my-title')
        const myBody = el.ownerDocument.querySelector('#my-body')
        const buttonSubmit = el.ownerDocument.querySelector('#my-button-submit');
        if (myId) component.form.get('id')?.setValue(1)
        if (myUseId) component.form.get('userId')?.setValue(1)
        if (myTitle) component.form.get('title')?.setValue('Lorem')
        if (myBody) component.form.get('body')?.setValue('Lorem Ipsum')
        if (buttonSubmit) (buttonSubmit as any).click()
        expect(spyOnHandleSubmit).toHaveBeenCalled();
        done();
    });
  });

  it('Call getFormControlLocal', (done: DoneFn) => {
    const spyOnGetForm = spyOn(component, 'getFormControlLocal').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.getFormControlLocal('id')?.getRawValue()).toBe(0)
      expect(spyOnGetForm).toHaveBeenCalled();
      done();
    });
  })
});
