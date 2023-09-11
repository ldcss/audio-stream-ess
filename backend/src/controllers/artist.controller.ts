import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import ArtistService from '../services/artist.service';
import ArtistEntity from '../entities/artist.entity';
import ArtistRepository from '../repositories/artist.repository';
import ArtistModel from '../models/artist.model';
import { User } from '@prisma/client';

class ArtistController {
  private prefix = '/artist';
  public router: Router;
  private artistService: ArtistService;

  constructor(router: Router, artistService: ArtistService) {
    this.router = router;
    this.artistService = artistService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) => this.getArtists(req, res));

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getArtist(req, res),
    );
    this.router.post(this.prefix, (req: Request, res: Response) => this.createArtist(req, res));
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateArtist(req, res),
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteArtist(req, res),
    );
  }

  private async getArtists(req: Request, res: Response) {
    const artists = await this.artistService.getEveryArtist();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: artists,
    }).handle(res);
  }

  private async getArtist(req: Request, res: Response) {
    const test = await this.artistService.getArtist(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async createArtist(req: Request, res: Response) {
    const artist = new ArtistEntity(req.body);

    const artistRepository = new ArtistRepository();

    const artistEntity = await artistRepository.createArtist(artist);

    //const artistModel = new ArtistModel(artistEntity);
    const artistModel = new ArtistModel({} as User);
    //const test = await this.artistService.createArtist(artist);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: artistModel,
    }).handle(res);
  }

  private async updateArtist(req: Request, res: Response) {
    const test = await this.artistService.updateArtist(req.params.id, new ArtistEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async deleteArtist(req: Request, res: Response) {
    await this.artistService.deleteArtist(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default ArtistController;
