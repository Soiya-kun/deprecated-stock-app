import { Sample } from "@/domains/sample";

export type SampleSchema = {
  id: string;
  lastName: string;
  firstName: string;
};

export const convertSampleDBSchemaToEntity = (ss: SampleSchema): Sample => ({
  ...ss,
});
