import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserRepository } from "./user.Repository";
import { AuthCredentialsDto } from "./dtos/auth_credentials.dto";
import * as bcrypt from "bcrypt";
import { UserRole } from "./enums/user_role.enum";
import { JwtToken } from "./models/jwt.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  public async signupUser(userCredentials: AuthCredentialsDto): Promise<User> {
    try {
      const { user_name, password } = userCredentials;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const createdUser = {
        user_name,
        password: hashedPassword,
        user_Role: UserRole.USER,
      };

      const user = this.userRepository.create(createdUser);
      await this.userRepository.save(user);
      return Promise.resolve(user);
    } catch (e) {
      console.log(e);
      if (e.code === "23505") {
        // duplicate username
        return Promise.reject(new ConflictException("Username already exists"));
      } else {
        return Promise.reject(new InternalServerErrorException());
      }
    }
  }

  public async signInUser(
    userCredentials: AuthCredentialsDto
  ): Promise<JwtToken> {
    const { user_name, password } = userCredentials;
    const logedInUser = await this.userRepository.findOne({
      where: { user_name },
    });

    if (logedInUser && bcrypt.compare(password, (await logedInUser).password)) {
      const accessToken: string = await this.jwtService.sign({ user_name });
      return { accessToken };
    }
  }
}
