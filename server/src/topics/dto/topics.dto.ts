import { IsObject, IsString } from "class-validator";

export class Topic {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsObject()
  image: {
    path: string;
    id: string;
  };
};