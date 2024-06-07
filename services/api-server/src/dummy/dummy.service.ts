import { Injectable } from "@nestjs/common";
import { type Dummy } from "@/dummy/interfaces/dummy.interface";
import { type CreateDummyDto } from "@/dummy/dto/dummy.dto";

@Injectable()
export class DummyService {
  fetchDummies(): Promise<Dummy[]> {
    // Should make a call to the database to fetch dummies
    return Promise.resolve([]);
  }

  createDummy(createDummyRequestBody: CreateDummyDto): Promise<Dummy> {
    // Should write the dummy to the database.
    return Promise.resolve(createDummyRequestBody);
  }
}
