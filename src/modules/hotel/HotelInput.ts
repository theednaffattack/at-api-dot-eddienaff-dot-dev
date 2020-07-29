import { Field, InputType } from "type-graphql";

@InputType()
export class PhotoInput {
  @Field()
  uri: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  isPublished?: boolean;
}

@InputType()
class PointObjectInput {
  @Field()
  X?: number;
  @Field()
  Y?: number;
}

@InputType()
export class HotelInput {
  @Field({ nullable: true })
  commentCount?: number;

  @Field({ nullable: true })
  coordinates?: PointObjectInput;

  @Field({ nullable: true })
  distanceKm?: string;

  @Field({ nullable: true })
  loveCount?: number;

  @Field()
  name: string;

  @Field(() => [PhotoInput], { nullable: true })
  photos: PhotoInput[];

  @Field()
  price: number;

  @Field({ nullable: true })
  temperature?: string;

  @Field({ nullable: true })
  weatherDescription?: string;

  @Field({ nullable: true })
  weatherIconName?: string;
}
