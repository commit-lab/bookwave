import { Injectable } from "@nestjs/common";
import { type Dummy } from "@/dummy/interfaces/dummy.interface";
import { type CreateDummyDto } from "@/dummy/dto/dummy.dto";

const fakeDatabase: Dummy[] = [];

@Injectable()
export class DummyService {
  fetchDummies(): Promise<Dummy[]> {
    // Should make a call to the database to fetch dummies
    return Promise.resolve(fakeDatabase);
  }

  createDummy(createDummyRequestBody: CreateDummyDto): Promise<Dummy> {
    // Should write the dummy to the database.
    fakeDatabase.push(createDummyRequestBody);
    return Promise.resolve(createDummyRequestBody);
  }
}
