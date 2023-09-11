import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import AlbumService from '../services/album.service';

class AlbumController {
  private prefix: string = '/album';
  public router: Router;
  private albumService: AlbumService;

  constructor(router: Router, albumService: AlbumService) {
    this.router = router;
    this.albumService = albumService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) => this.getAlbuns(req, res));
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) => this.getAlbumById(req, res));
    this.router.post(`${this.prefix}`, (req: Request, res: Response) => this.createAlbum(req, res));
    this.router.patch(`${this.prefix}/:id`, (req: Request, res: Response) => this.updateAlbum(req, res));
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) => this.deleteAlbum(req, res));
  }

  private async getAlbuns(req: Request, res: Response) {
    const albuns = await this.albumService.getAlbunsService();
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: albuns,
    }).handle(res);
  }

  private async getAlbumById(req: Request, res: Response) {
    const album = await this.albumService.getAlbum(req.params.id);
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: album,
    }).handle(res);
  }

  private async createAlbum(req: Request, res: Response) {
    const data  = req.body
    const album = await this.albumService.createAlbum(data);
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: album,
    }).handle(res);
  }

  private async updateAlbum(req: Request, res: Response) {
    const data  = req.body
    const id  = req.params.id

    const album = await this.albumService.updateAlbum(id, data);
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: album,
    }).handle(res);
  }

  private async deleteAlbum(req: Request, res: Response) {
    const id  = req.params.id

    const album = await this.albumService.deleteAlbum(id);
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: null,
    }).handle(res);
  }

}

export default AlbumController;
