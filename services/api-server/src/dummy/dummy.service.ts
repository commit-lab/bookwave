import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { isNullOrUndefined } from "@bookwave/utils";
import { type Dummy } from "@/dummy/interfaces/dummy.interface";
import {
  type DummyDto,
  type CreateDummyDto,
  type UpdateDummyDto,
} from "@/dummy/dto/dummy.dto";
import { DUMMY_MODEL } from "@/dummy/dummy.constants";

@Injectable()
export class DummyService {
  constructor(
    @Inject(DUMMY_MODEL)
    private readonly dummyModel: Model<Dummy>
  ) {}

  async fetchDummies(): Promise<DummyDto[]> {
    const allDummies = await this.dummyModel.find().exec();

    const dummiesResponse = allDummies.map(
      ({ _id: id, foo, bar, content }) => ({
        id,
        foo,
        bar,
        content,
      })
    );

    return dummiesResponse;
  }

  async fetchOneDummy(dummyId: string): Promise<DummyDto> {
    const dummy = await this.dummyModel.findOne({ _id: dummyId });
    if (isNullOrUndefined(dummy)) {
      throw new NotFoundException(`Dummy not found.`);
    }

    const dummyDto: DummyDto = {
      id: dummy._id,
      foo: dummy.foo,
      bar: dummy.bar,
      content: dummy.content,
    };
    return dummyDto;
  }

  async createDummy(createDummyRequestBody: CreateDummyDto): Promise<Dummy> {
    const createdDummy = await this.dummyModel.create({
      ...createDummyRequestBody,
    });
    return createdDummy;
  }

  async updateDummy(
    dummyId: string,
    updateDummyRequestBody: UpdateDummyDto
  ): Promise<DummyDto> {
    const updatedDummy = await this.dummyModel.findByIdAndUpdate(
      dummyId,
      updateDummyRequestBody,
      { new: true }
    );

    if (isNullOrUndefined(updatedDummy)) {
      throw new NotFoundException(`Dummy not found.`);
    }

    const updateDummyDto: DummyDto = {
      id: updatedDummy._id,
      foo: updatedDummy.foo,
      bar: updatedDummy.bar,
      content: updatedDummy.content,
    };
    return updateDummyDto;
  }
}
