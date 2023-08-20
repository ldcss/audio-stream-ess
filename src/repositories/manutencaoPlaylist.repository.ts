import manutencaoPlaylistEntity from '../entities/manutencaoPlaylist.entity';
import BaseRepository from './base.repository';

class TestRepository extends BaseRepository<manutencaoPlaylistEntity> {
  constructor() {
    super('tests');
  }

  public async getTests(): Promise<manutencaoPlaylistEntity[]> {
    return await this.findAll();
  }

  public async getTest(id: string): Promise<manutencaoPlaylistEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createTest(data: manutencaoPlaylistEntity): Promise<manutencaoPlaylistEntity> {
    return await this.add(data);
  }

  public async updateTest(
    id: string,
    data: manutencaoPlaylistEntity
  ): Promise<manutencaoPlaylistEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteTest(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default TestRepository;
