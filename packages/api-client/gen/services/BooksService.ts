/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookDto } from '../models/BookDto';
import type { BookWithChapterTitlesDto } from '../models/BookWithChapterTitlesDto';
import type { CreateBookDto } from '../models/CreateBookDto';
import type { DeletedBookResponseDto } from '../models/DeletedBookResponseDto';
import type { UpdateBookDto } from '../models/UpdateBookDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BooksService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns BookDto All books by author successfully found.
     * @throws ApiError
     */
    public getAll(): CancelablePromise<Array<BookDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/books',
        });
    }

    /**
     * @param requestBody
     * @returns BookDto Book successfully created.
     * @throws ApiError
     */
    public createOne(
        requestBody: CreateBookDto,
    ): CancelablePromise<BookDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/books',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param bookHandle
     * @returns BookWithChapterTitlesDto Book successfully found.
     * @throws ApiError
     */
    public getOne(
        bookHandle: string,
    ): CancelablePromise<BookWithChapterTitlesDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/books/{bookHandle}',
            path: {
                'bookHandle': bookHandle,
            },
        });
    }

    /**
     * @param bookId
     * @param requestBody
     * @returns BookDto Book successfully updated.
     * @throws ApiError
     */
    public updateOne(
        bookId: string,
        requestBody: UpdateBookDto,
    ): CancelablePromise<BookDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/books/{bookId}',
            path: {
                'bookId': bookId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param bookId
     * @returns DeletedBookResponseDto Book successfully deleted.
     * @throws ApiError
     */
    public deleteBook(
        bookId: string,
    ): CancelablePromise<DeletedBookResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/books/{bookId}',
            path: {
                'bookId': bookId,
            },
        });
    }

}
