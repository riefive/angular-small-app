import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'post', loadChildren: () => import('../controllers/post/post.module').then(module => module.PostModule) },
  { path: 'comment', loadChildren: () => import('../controllers/comment/comment.module').then(module => module.CommentModule) },
  { path: 'album', loadChildren: () => import('../controllers/album/album.module').then(module => module.AlbumModule) },
  { path: 'photo', loadChildren: () => import('../controllers/photo/photo.module').then(module => module.PhotoModule) },
  { path: 'todo', loadChildren: () => import('../controllers/todo/todo.module').then(module => module.TodoModule) },
  { path: 'user', loadChildren: () => import('../controllers/user/user.module').then(module => module.UserModule) }
];

@NgModule({
  declarations: [	
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule, 
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
