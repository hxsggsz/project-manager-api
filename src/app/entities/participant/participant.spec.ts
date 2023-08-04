import { Participant } from './participant';

describe('participant entitiy', () => {
  it('should create a new instance of participant class correctly', () => {
    const participant = new Participant({
      userId: '1234',
      projectId: 'test',
      role: 'admin',
    });

    expect(participant).toBeTruthy();
  });
});
