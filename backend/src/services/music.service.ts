import MusicRepository from "../repositories/music.repository";
import { Music } from '@prisma/client';


class MusicService{
  
  private musicRepository: MusicRepository;

  constructor(musicRepository: MusicRepository) {
    this.musicRepository = musicRepository;
  }

  public async getMusics(): Promise<Music[] | null> {
    return await this.musicRepository.getMusics();
  }

}

export default MusicService;