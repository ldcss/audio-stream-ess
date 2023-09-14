import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import MusicService from '../services/music.service';
import MusicEntity from '../entities/artist.entity';
import MusicRepository from '../repositories/music.repository';
import MusicModel from '../models/music.model';

class MusicController {
  private prefix = '/music';
  public router: Router;
  private musicService: MusicService;

  constructor(router: Router, musicService: MusicService) {
    this.router = router;
    this.musicService = musicService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) => this.getMusics(req, res));
  }

  private async getMusics(req: Request, res: Response) {
    const music = await this.musicService.getMusics();
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: music,
    }).handle(res);
  }

}

export default MusicController;
