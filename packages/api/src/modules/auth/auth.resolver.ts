import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticateInput, AuthenticationResult } from './auth.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthenticationResult)
    async authenticate(
        @Args('input') input: AuthenticateInput,
    ): Promise<AuthenticationResult> {
        return this.authService.authenticate(input.password);
    }

    @Query(() => Boolean)
    async validateToken(@Args('token') token: string): Promise<boolean> {
        return this.authService.verifyToken(token);
    }
}