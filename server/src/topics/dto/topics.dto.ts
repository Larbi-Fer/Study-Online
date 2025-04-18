import { Allow, IsObject, IsString } from "class-validator";

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
  @IsObject()
  icon: {
    path: string;
    id: string;
  };
  @IsString()
  color: string;
};

export class CreateTopicDto extends Topic {
  @Allow()
  dependencies?: {id: string}[]
}

export class UpdateTopicDto extends Topic {
  @Allow()
  dependencies?: {
    connect: {id: string}[];
    disconnect: {id: string}[]
  }
}