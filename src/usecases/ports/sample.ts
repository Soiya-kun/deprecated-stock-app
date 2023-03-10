import { Sample } from "@/domains/sample";

export interface SampleAPI {
  list(): Promise<Sample[]>;
  findById(id: string): Promise<Sample>;
  create(sample: Sample): Promise<Sample>;
}
