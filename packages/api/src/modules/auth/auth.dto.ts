import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class AuthenticateInput {
    @Field()
    password!: string;
}

@ObjectType()
export class AuthenticationResult {
    @Field()
    success!: boolean;

    @Field({ nullable: true })
    token?: string;

    @Field({ nullable: true })
    message?: string;
}