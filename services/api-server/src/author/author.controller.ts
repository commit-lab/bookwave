import { Controller, Get, Post, Body, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { type Request } from "express";
import {
  AuthorDto,
  CreateAuthorDto,
  DeleteAuthorResponseDto,
  FetchAuthorResponseDto,
} from "@/author/dto/author.dto";
import { AuthorService } from "./author.service";

@ApiBearerAuth()
@ApiTags("author")
@Controller("author")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOkResponse({
    type: AuthorDto,
  })
  @Post()
  async create(
    @Req() request: Request,
    @Body() createAuthorDto: CreateAuthorDto
  ) {
    if (request.author) {
      throw new Error("User already exists for firebase uid.");
    }
    if (!request.firebaseUid) {
      throw new Error("No Firebase Uid on request.");
    }
    return this.authorService.create(createAuthorDto, request.firebaseUid);
  }

  @ApiOkResponse({
    type: FetchAuthorResponseDto,
  })
  @Get()
  fetch(@Req() request: Request): Promise<FetchAuthorResponseDto> {
    const fetchAuthorReponse = new FetchAuthorResponseDto();
    if (request.author) {
      fetchAuthorReponse.author = request.author as AuthorDto;
    }
    return Promise.resolve(fetchAuthorReponse);
  }

  @ApiOkResponse({
    type: DeleteAuthorResponseDto,
  })
  @Get("delete")
  async delete(@Req() request: Request): Promise<DeleteAuthorResponseDto> {
    const deleteAuthorResponse = new DeleteAuthorResponseDto();
    if (request.author && request.firebaseUid) {
      const deleteResult = await this.authorService.delete(request.firebaseUid);
      deleteAuthorResponse.deletedCount = deleteResult.deletedCount;
    }
    return Promise.resolve(deleteAuthorResponse);
  }
}
