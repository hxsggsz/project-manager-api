import { Injectable } from '@nestjs/common';
import { Project } from '../../../../app/entities/project/project';
import { ProjectRepository } from '../../../../app/repositories/project-repository';
import { PrismaProjectMappers } from '../mappers/prisma-project-mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(project: Project): Promise<void> {
    await this.prisma.projects.create({
      data: {
        name: project.name,
        isPublic: project.isPublic,
        owner: { connect: { id: project.ownerId } },
      },
    });
  }

  async update(project: Project): Promise<void> {
    await this.prisma.projects.update({
      where: {
        id: project.id,
      },
      data: {
        name: project.name,
        isPublic: project.isPublic,
      },
    });
  }

  async findAll(ownerId: string): Promise<Project[]> {
    const allProjects = await this.prisma.projects.findMany({
      where: {
        ownerId,
      },
    });
    return allProjects.map(PrismaProjectMappers.toDomain);
  }

  async findById(projectId: string): Promise<Project | null> {
    const project = await this.prisma.projects.findUnique({
      where: { id: projectId },
    });
    if (!project) return null;

    return PrismaProjectMappers.toDomain(project);
  }

  async deleteById(projectId: string): Promise<void> {
    await this.prisma.projects.delete({
      where: { id: projectId },
    });
  }
}
