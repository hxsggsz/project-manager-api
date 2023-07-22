import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../app/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { User } from '../../../../app/entities/user/user';
import { PrismaUserMappers } from '../mappers/prisma-user-mappers';

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
