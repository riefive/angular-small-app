import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TemplateMainComponent } from 'src/components/template-main/template-main.component';
import { IndexComponent } from './index.component';
import { AlbumComponent } from './album/album.component';
import { CommentComponent } from './comment/comment.component';
import { PhotoComponent } from './photo/photo.component';
import { PostComponent } from './post/post.component';
import { PostIdComponent } from './post-id/post-id.component';
import { TodoComponent } from './todo/todo.component';
import { TodoIdComponent } from './todo-id/todo-id.component';
import { UserComponent } from './user/user.component';
import { authGuard } from 'src/guards/auth.guard';

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
    MatToolbarModule,
];

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: '', component: IndexComponent },
      { path: 'album', component: AlbumComponent },
      { path: 'comment', component: CommentComponent },
      { path: 'photo', component: PhotoComponent },
      { path: 'post', component: PostComponent },
      { path: 'post/:id', component: PostIdComponent },
      { path: 'todo', component: TodoComponent },
      { path: 'todo/:id', component: TodoIdComponent },
      { path: 'user', component: UserComponent },
    ],
    canActivateChild: [authGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    OverlayModule,
    CdkTreeModule,
    PortalModule,
    RouterModule.forChild(routes),
    ...materialModules
  ],
  declarations: [
    IndexComponent,
    AlbumComponent, 
    CommentComponent, 
    PhotoComponent, 
    PostComponent, 
    PostIdComponent, 
    TodoComponent,
    TodoIdComponent,
    UserComponent,
    TemplateMainComponent
  ]
})
export class PageMainModule { }
