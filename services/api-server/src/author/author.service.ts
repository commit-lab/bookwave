import { Model } from "mongoose";
import { type DeleteResult } from "mongodb";
import { Injectable, Inject } from "@nestjs/common";
import { type Author } from "./interfaces/author.interface";
import { type CreateAuthorDto } from "./dto/author.dto";
import { AUTHOR_MODEL } from "./author.constants";

@Injectable()
export class AuthorService {
  constructor(
    @Inject(AUTHOR_MODEL)
    private readonly authorModel: Model<Author>
  ) {}

  async create(
    createAuthorDto: CreateAuthorDto,
    firebaseUid: string
  ): Promise<Author> {
    const createdAuthor = this.authorModel.create({
      firebaseUid,
      firstName: createAuthorDto.firstName,
      lastName: createAuthorDto.lastName,
      handle: createAuthorDto.handle,
    });
    return createdAuthor;
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findByFirebaseUid(uid: string): Promise<Author | null> {
    return this.authorModel.findOne({ firebaseUid: uid }).exec();
  }

  async delete(uid: string): Promise<DeleteResult> {
    return this.authorModel.deleteOne({ firebaseUid: uid }).exec();
  }
}
