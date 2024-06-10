import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { type Author } from "./interfaces/author.interface";
import { type CreateAuthorDto } from "./dto/create-author.dto";
import { AUTHOR_MODEL } from "./author.constants";

@Injectable()
export class AuthorService {
  constructor(
    @Inject(AUTHOR_MODEL)
    private readonly authorModel: Model<Author>
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const createdAuthor = this.authorModel.create(createAuthorDto);
    return createdAuthor;
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }
}
