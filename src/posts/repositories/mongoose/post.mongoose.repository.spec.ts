import { IPost } from 'src/posts/schemas/models/post.interface';
import { PostRepository } from '../post.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { Model } from 'mongoose';

export class PostMongooseRepository implements PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  getAllPosts(): Promise<IPost[]> {
    return this.postModel.find({}); // Removemos o .exec() aqui
  }

  searchPost(term: string): Promise<IPost[]> {
    const regex = new RegExp(term, 'i');
    return this.postModel.find({
      $or: [{ title: regex }, { description: regex }],
    }); // Removemos o .exec() aqui também
  }

  getPost(postId: string): Promise<IPost> {
    return this.postModel.findById(postId); // Removemos o .exec()
  }

  async createPost(post: IPost): Promise<void> {
    const createPost = new this.postModel(post);
    await createPost.save(); // Aqui não usamos .exec()
  }

  async updatePost(postId: string, post: Partial<IPost>): Promise<void> {
    await this.postModel.updateOne(
      { _id: postId },
      { title: post.title, description: post.description },
    ); // Removemos o .exec() aqui também
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.deleteOne({ _id: postId }); // Sem .exec() aqui
  }
}
