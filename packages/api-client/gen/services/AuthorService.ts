/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthorDto } from '../models/AuthorDto';
import type { CreateAuthorDto } from '../models/CreateAuthorDto';
import type { DeleteAuthorResponseDto } from '../models/DeleteAuthorResponseDto';
import type { FetchAuthorResponseDto } from '../models/FetchAuthorResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthorService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody
     * @returns AuthorDto
     * @throws ApiError
     */
    public create(
        requestBody: CreateAuthorDto,
    ): CancelablePromise<AuthorDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/author',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns FetchAuthorResponseDto
     * @throws ApiError
     */
    public fetch(): CancelablePromise<FetchAuthorResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/author',
        });
    }

    /**
     * @returns DeleteAuthorResponseDto
     * @throws ApiError
     */
    public delete(): CancelablePromise<DeleteAuthorResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/author/delete',
        });
    }

}
