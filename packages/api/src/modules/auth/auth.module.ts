import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ParamsModule } from '../params/params.module';

@Module({
    imports: [ParamsModule],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule { }