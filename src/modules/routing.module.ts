import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateMainComponent } from 'src/components/template-main/template-main.component';
import { authGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  /*{
    path: 'test',
    children: [
      { path: 'post', loadChildren: () => import('../controllers/post/post.module').then(module => module.PostModule) },
      { path: 'comment', loadChildren: () => import('../controllers/comment/comment.module').then(module => module.CommentModule) },
      { path: 'album', loadChildren: () => import('../controllers/album/album.module').then(module => module.AlbumModule) },
      { path: 'photo', loadChildren: () => import('../controllers/photo/photo.module').then(module => module.PhotoModule) },
      { path: 'todo', loadChildren: () => import('../controllers/todo/todo.module').then(module => module.TodoModule) },
      { path: 'user', loadChildren: () => import('../controllers/user/user.module').then(module => module.UserModule) }
    ],
    canActivateChild: [authGuard]
  }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class RoutingModule { }