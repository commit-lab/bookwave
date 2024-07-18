/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDummyDto } from '../models/CreateDummyDto';
import type { DummyDto } from '../models/DummyDto';
import type { UpdateDummyDto } from '../models/UpdateDummyDto';

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

    /**
     * @param dummyId
     * @returns DummyDto
     * @throws ApiError
     */
    public fetchOne(
        dummyId: string,
    ): CancelablePromise<DummyDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/dummy/{dummyId}',
            path: {
                'dummyId': dummyId,
            },
        });
    }

    /**
     * @param dummyId
     * @param requestBody
     * @returns DummyDto
     * @throws ApiError
     */
    public updateOne(
        dummyId: string,
        requestBody: UpdateDummyDto,
    ): CancelablePromise<DummyDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/dummy/{dummyId}',
            path: {
                'dummyId': dummyId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
