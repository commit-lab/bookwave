import { Model, Schema, model } from 'mongoose';

export interface IChapter {
  title: string;
  content: string;
};

export type ChapterModel = Model<IChapter>;

export const ChapterSchema : Schema = new Schema<IChapter, ChapterModel>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const Chapter : ChapterModel = model<IChapter, ChapterModel>('Chapter', ChapterSchema);