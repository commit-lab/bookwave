import { Model, Schema, Types, model } from 'mongoose';
import { ChapterSchema, IChapter } from './chapter';

export enum PublishState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

export interface IBook {
  title: string;
  handle: string;
  authorId: Types.ObjectId;
  publishedAt: Date;
  state: PublishState;
  chapters: IChapter[];
}

export type BookModel = Model<IBook>;

export const BookSchema : Schema = new Schema<IBook, BookModel>({
  title: { type: String, required: true },
  handle: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, required: true},
  publishedAt: {type: Date},
  state: {type: String, enum: PublishState, default: PublishState.DRAFT},
  chapters: {type: [ChapterSchema]}
});

export const Book : BookModel = model<IBook, BookModel>('Book', BookSchema);