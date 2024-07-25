/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChapterDto } from '../models/ChapterDto';
import type { CreateChapterDto } from '../models/CreateChapterDto';
import type { DeletedChapterResponseDto } from '../models/DeletedChapterResponseDto';
import type { UpdateChapterDto } from '../models/UpdateChapterDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChaptersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param bookHandle
     * @param chapterNumber
     * @returns ChapterDto Chapter successfully found.
     * @throws ApiError
     */
    public getOne(
        bookHandle: string,
        chapterNumber: number,
    ): CancelablePromise<ChapterDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/{bookHandle}/chapters/{chapterNumber}',
            path: {
                'bookHandle': bookHandle,
                'chapterNumber': chapterNumber,
            },
        });
    }

    /**
     * @param bookId
     * @param requestBody
     * @returns ChapterDto Chapter successfully created.
     * @throws ApiError
     */
    public createOne(
        bookId: string,
        requestBody: CreateChapterDto,
    ): CancelablePromise<ChapterDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/{bookHandle}/chapters',
            path: {
                'bookId': bookId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param chapterId
     * @param requestBody
     * @returns ChapterDto Chapter successfully updated.
     * @throws ApiError
     */
    public updateOne(
        chapterId: string,
        requestBody: UpdateChapterDto,
    ): CancelablePromise<ChapterDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/{bookHandle}/chapters/{chapterId}',
            path: {
                'chapterId': chapterId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param chapterId
     * @returns DeletedChapterResponseDto Chapter successfully deleted.
     * @throws ApiError
     */
    public deleteChapter(
        chapterId: string,
    ): CancelablePromise<DeletedChapterResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/{bookHandle}/chapters/{chapterId}',
            path: {
                'chapterId': chapterId,
            },
        });
    }

}
