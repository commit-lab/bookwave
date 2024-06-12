import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { AuthorService } from "./author.service";
import { type Author } from "./interfaces/author.interface";

@ApiBearerAuth()
@ApiTags("author")
@Controller("author")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  async findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }
}
