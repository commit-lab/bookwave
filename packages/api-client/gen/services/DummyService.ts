/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDummyDto } from '../models/CreateDummyDto';
import type { DummyDto } from '../models/DummyDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DummyService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns DummyDto
     * @throws ApiError
     */
    public fetchAllDumies(): CancelablePromise<Array<DummyDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/dummy',
        });
    }

    /**
     * @param requestBody
     * @returns DummyDto
     * @throws ApiError
     */
    public createOne(
        requestBody: CreateDummyDto,
    ): CancelablePromise<DummyDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/dummy',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
