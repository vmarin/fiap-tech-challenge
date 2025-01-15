import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../schemas/models/post.interface';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async getAllPosts() {
    const posts = await this.postRepository.getAllPosts();
    return posts;
  }
  async searchPost(term: string) {
    const post = this.postRepository.searchPost(term);

    return post;
  }
  async getPost(postId: string) {
    const post = await this.postRepository.getPost(postId);

    if (!post) throw new NotFoundException('Post não encontrado');
    return post;
  }

  async createPost(post: IPost) {
    const newPost = await this.postRepository.createPost(post);

    return newPost;
  }

  async updatePost(postId: string, post: Partial<IPost>) {
    const updatedPost = await this.postRepository.updatePost(postId, post);

    return updatedPost;
  }

  async deletePost(postId: string) {
    const post = await this.postRepository.deletePost(postId);

    return post;
  }
}
