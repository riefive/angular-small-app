import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkInvalid, getFormControl } from 'src/helpers/helper.form';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/types/post.type';

interface PostInput {
  id: FormControl <string|number|null>,
  userId: FormControl <string|number|null>,
  title: FormControl <string|null>,
  body: FormControl <string|null>,
}

@Component({
  selector: 'app-post-id',
  templateUrl: './post-id.component.html',
  styleUrls: ['./post-id.component.css']
})
export class PostIdComponent implements OnInit {
  public item: Post = { userId: 0, id: 0, title: '', body: '' }
  public form!: FormGroup<PostInput>;
  public detailId = 0
  public mode = 'add'

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private builder: FormBuilder, 
    private postService: PostService) { }

  checkInvalidLocal(name: string) {
    return checkInvalid(this.form, name)
  }

  getFormControlLocal(name: string) {
    return getFormControl(this.form, name)
  }

  handleButtonClick(type: string) {
    if (type === 'cancel') {
      this.router.navigateByUrl('/post')
    }
  }

  handleSubmit() {
    if (this.form.invalid) return;
    const formValue = this.form.value
    if (this.mode === 'edit') {
      this.postService.update(this.detailId, formValue).subscribe()
    } else {
      this.postService.insert(formValue).subscribe()
    }
    this.router.navigateByUrl('/post')
  }

  handleGetOne() {
    this.postService.getOne(this.detailId).subscribe((result: Post) => {
      this.item.id = result.id
      this.item.userId = result.userId
      this.item.title = result.title
      this.item.body = result.body
      this.form.setValue(this.item)
    })
  }

  ngOnInit() {
    this.form = this.builder.group<PostInput>({
      id: new FormControl(0, Validators.required),
      userId: new FormControl(0, Validators.required),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });

    this.route.paramMap.subscribe((result: any) => {
      this.detailId = Number(result.params?.id) || 0
      this.mode = result.params?.id !== 'create' && this.detailId > 0 ? 'edit' : 'add'
      if (!this.detailId) return
      this.handleGetOne()
    });
  }
}
