import { Project } from '../../src/app/entities/project/project';
import { Participant } from '../../src/app/entities/participant/participant';
import { ParticipantRepository } from '../../src/app/repositories/participant-repository';

export class InMemoryParticipantRepository implements ParticipantRepository {
  public participant: Participant[] = [];
  public project: Project[] = [
    new Project(
      {
        name: 'name test',
        isPublic: true,
        ownerId: 'owneruuid',
      },
      'id-test',
    ),
  ];

  async findParticipantById(
    participantId: string,
  ): Promise<Participant | null> {
    const user = this.participant.find((part) => part.id === participantId);
    if (!user) null;

    return user;
  }

  async addParticipant(participant: Participant): Promise<void> {
    this.participant.push(participant);
  }

  async getAllParticipants(projectsId: string): Promise<Participant[]> {
    return this.participant.filter((part) => part.projectId === projectsId);
  }

  async removeParticipant(participantId: string): Promise<void> {
    const participantRemoved = this.participant.filter(
      (part) => part.id !== participantId,
    );
    this.participant = participantRemoved;
  }

  async getProjectOwner(projectsId: string): Promise<Project> {
    return this.project.find((proj) => proj.id === projectsId);
  }
}
