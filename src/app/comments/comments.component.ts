import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user.model';
import { Comment } from 'src/app/comments/comment.model';
import * as _ from 'underscore';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(private userService:UserService, private formBuilder: FormBuilder,) { }
  @ViewChild('slickModal') slickModal: any;
  users:any
  comments = []
  formComment: FormGroup;
  submitted = false;

  slide1Config = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    infinite:true, 
    pauseOnHover:true,
    speed: 2000,
    dots: false,
    arrows: true,
   
    
  }
  ngOnInit() {
    this.submitted = false;
    var prov = [];
    this.userService.getUsers().subscribe((ApiResponse) => {
      this.users = ApiResponse;
      this.users.forEach((value,i)=>{        
        this.userService.getComments(value.id).subscribe((ApiResponse2) => {
          ApiResponse2.forEach((value2,i2)=>{
            prov.push({
              user:value,
              comment:value2
            })
            if(i == this.users.length - 1 && i2 == ApiResponse2.length -1 ){
              this.comments = prov;
              this.comments.reverse();
            }
              
            
          })
          
        });

      });
     
    });

    this.formComment = this.formBuilder.group({
     name: ['', [Validators.required]],
     avatar:  ['', [Validators.required]],
     site: ['', [Validators.required]],
     comment: ['', [Validators.required]]
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.formComment.controls.site.status == 'INVALID')
      return;
    var user = {
      name: this.formComment.get('name').value,
      avatar: this.formComment.get('avatar').value,
      site: this.formComment.get('site').value
    }
    this.userService.postUser(user).subscribe((response) =>{
      console.log(response);
      var comment = {
        userId : response.id,
        comment:this.formComment.get('comment').value
      }
      this.userService.postComment(comment).subscribe(response2 =>{
        console.log(response2);
        this.comments.push({
          user:response,
          comment:response2
        })
        this.comments = this.comments.reverse();
        this.formComment.reset();
        this.submitted = false;
        this.slickModal.unslick();    
        //this.slickModal.slick(); 
      })
    })
    
  }

}


