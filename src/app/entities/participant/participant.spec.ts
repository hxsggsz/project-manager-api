import { Participant } from './participant';

describe('participant entitiy', () => {
  it('should create a new instance of participant class correctly', () => {
    const participant = new Participant({
      name: 'test',
      profilePhoto: 'test',
      username: 'test',
      projectId: 'test',
    });

    expect(participant).toBeTruthy();
  });
});
