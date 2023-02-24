import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth_credentials.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtToken } from './models/jwt.model';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/signup')
    public signUpUser(@Body() authCredentials: AuthCredentialsDto): Promise<User>{
       return  this.userService.signupUser(authCredentials);
    }

    @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<JwtToken> {
    return this.userService.signInUser(authCredentialsDto);
  }
}
