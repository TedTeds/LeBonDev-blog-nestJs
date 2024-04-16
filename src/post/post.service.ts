import { Injectable, NotFoundException } from '@nestjs/common';
import { AddPostDto } from "./dtos/addPostDto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {

  postRepository: any;

  constructor(@InjectRepository(Post) private readonly userRepository: Repository<Post>) { }

  async postAddPost(body: AddPostDto, user: User) {
    const post = this.userRepository.create(body)
    post.user = user
    await this.userRepository.save(post)
    return "created Article"
  }

  async getAllPosts() {
    const posts = await this.postRepository.find({ order: { created_at: "DESC" } })
    return { posts }
  }

  async getDetailPost(id: string) {
    const post = await this.postRepository.findOne({ where: { id: +id }, relations: { user: true } 
    });
    if (!post) throw new NotFoundException ("article n'existe pas")
    return post
  }
}