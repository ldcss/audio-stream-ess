import ArtistEntity from '../entities/artist.entity';
import ArtistModel from '../models/artist.model';
import ArtistRepository from '../repositories/artist.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';
import { User } from '@prisma/client';

class ArtistService {
  private artistRepository: ArtistRepository;

  constructor(artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository;
  }

  public async getEveryArtist(): Promise<any[]> {
    const artistsEntity = await this.artistRepository.getArtists();

    //const artistsModel = artistsEntity.map(artist => new ArtistModel(artist));

    return artistsEntity;
  }

  public async getArtist(id: number): Promise<User> {
    const artist = await this.artistRepository.getArtist(id);

    if (!artist) {
      throw new HttpNotFoundError({
        msg: 'Artist not found',
        msgCode: 'artist_not_found',
      });
    }

    return artist;
  }

  public async createArtist(data: ArtistEntity): Promise<ArtistModel> {
    const artistEntity = await this.artistRepository.createArtist(data);

    //const artistModel = new ArtistModel(artistEntity);
    const artistModel = new ArtistModel({} as User);

    return artistModel;
  }

  public async updateArtist(id: number, data: ArtistEntity): Promise<ArtistModel> {
    const ArtistEntity = await this.artistRepository.updateArtist(id, data);

    if (!ArtistEntity) {
      throw new HttpNotFoundError({
        msg: 'Artist not found',
        msgCode: 'artist_not_found',
      });
    }

    //const artistModel = new ArtistModel(artistEntity);
    const artistModel = new ArtistModel({} as User);

    return artistModel;
  }

  public async deleteArtist(id: number): Promise<void> {
    await this.artistRepository.deleteArtist(id);
  }
}

export default ArtistService;
