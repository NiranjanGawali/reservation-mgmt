import { AbstractDocument } from '@app/core-lib';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class UserDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop()
  @Field(() => [String])
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
