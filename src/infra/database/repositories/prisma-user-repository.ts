import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/app/entities/user';
import { PrismaUserMappers } from '../prisma/mappers/prisma-user-mappers';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const rawUser = PrismaUserMappers.toPrisma(user);
    await this.prisma.user.create({
      data: rawUser,
    });
  }
  async update(user: User): Promise<void> {
    const rawUser = PrismaUserMappers.toPrisma(user);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: rawUser,
    });
  }
  async findUserById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return PrismaUserMappers.toDomain(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) return null;

    return PrismaUserMappers.toDomain(user);
  }
}
