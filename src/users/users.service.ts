import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/user.repository';
import { RoleEnum } from '../roles/roles.enum';
import * as bcrypt from 'bcrypt';
import { NullableType } from 'src/utils/types/nullable.type';
import { User } from './entities/user.entity';
import { JwtPayloadType } from 'src/utils/types/jwt-payload.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.email) {
      const userObject = await this.usersRepository.findByEmail(
        createUserDto.email,
      );
      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
    }

    if (createUserDto.password) {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    }

    if (createUserDto.role?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(createUserDto.role.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        });
      }
    }

    return this.usersRepository.create(createUserDto);
  }

  findById(id: string): Promise<NullableType<User>> {
    return this.usersRepository.findById(id);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findByEmail(email: string): Promise<NullableType<User>> {
    return this.usersRepository.findByEmail(email);
  }

  async update(
    id: string,
    payload: UpdateUserDto,
  ): Promise<User | null> {

    if (payload.password) {
      const salt = await bcrypt.genSalt();
      payload.password = await bcrypt.hash(payload.password, salt);
    }

    if (payload.email) {
      const userObject = await this.usersRepository.findByEmail(
        payload.email,
      );

      if (userObject && userObject._id.toString() !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
    }

    if (payload.role?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(payload.role.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        });
      }
      payload.role.name = RoleEnum[payload.role.id]
    }

    return this.usersRepository.update(id, payload);
  }

  async updateMe(
    userJwtPayload: JwtPayloadType,
    payload: UpdateUserDto,
  ): Promise<any> {
    return this.update(userJwtPayload._id.toString(), payload)
  }
}
