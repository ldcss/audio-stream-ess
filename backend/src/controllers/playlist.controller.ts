import { Router, Request, Response } from 'express';
import { FailureResult, Result, SuccessResult } from '../utils/result';
import PlaylistService from '../services/playlist.service';

class PlaylistController {
  public prefix = '/playlist';
  public router: Router;
  private playlistService: PlaylistService;

  constructor(router: Router, playlistService: PlaylistService) {
    this.router = router;
    this.playlistService = playlistService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) => this.getPlaylists(req, res));
    this.router.get(`/user/:idUser${this.prefix}/:idPlaylist`, (req: Request, res: Response) =>
      this.getPlaylist(req, res),
    );
    this.router.get(`/user/:idUser${this.prefix}`, (req: Request, res: Response) =>
      Object.keys(req.query).length
        ? this.getPlaylistsByFilter(req, res)
        : this.getPlaylistsByUser(req, res),
    );

    this.router.get(`${this.prefix}/:id/likes`, (req: Request, res: Response) =>
      this.getPlaylistLikesDetails(req, res),
    );
    this.router.post(`${this.prefix}/:id/likes/:userId`, (req: Request, res: Response) =>
      this.addLikeToPlaylist(req, res),
    );
    this.router.delete(`${this.prefix}/:id/likes/:userId`, (req: Request, res: Response) =>
      this.removeLikeFromPlaylist(req, res),
    );
    this.router.post(this.prefix, (req: Request, res: Response) => this.createPlaylist(req, res));
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updatePlaylist(req, res),
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deletePlaylist(req, res),
    );
    this.router.get(`${this.prefix}/likes`, (req: Request, res: Response) =>
      this.getLikesForAllPlaylists(req, res),
    );

    this.router.post(`${this.prefix}/:id/musica/:idMusica`, (req: Request, res: Response) =>
      this.addMusicToPlaylist(req, res),
    );

    this.router.delete(`${this.prefix}/:id/musica/:idMusica`, (req: Request, res: Response) =>
      this.deleteMusicFromPlaylist(req, res),
    );
  }

  private async getPlaylistsByUser(req: Request, res: Response) {
    const playlists = await this.playlistService.getAllPlaylists(+req.params.idUser);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: playlists,
    }).handle(res);
  }

  private async getPlaylistsByFilter(req: Request, res: Response) {
    const playlists = await this.playlistService.getPlaylistsByFilter(
      +req.params.idUser,
      req.query,
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: playlists,
    }).handle(res);
  }

  private async getPlaylists(req: Request, res: Response) {
    try {
      const playlists = await this.playlistService.getPlaylists(req.query);
      console.log('playlists', playlists);

      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: playlists,
      }).handle(res);
    } catch {
      return new FailureResult({
        msg: Result.transformRequestOnMsg(req),
        code: 404,
        msgCode: 'failure',
      }).handle(res);
    }
  }

  private async getPlaylist(req: Request, res: Response) {
    try {
      const playlist = await this.playlistService.getPlaylist(
        +req.params.idPlaylist,
        +req.params.idUser,
      );
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: playlist,
      }).handle(res);
    } catch {
      return new FailureResult({
        msg: Result.transformRequestOnMsg(req),
        code: 404,
        msgCode: 'failure',
      }).handle(res);
    }
  }
  private async deletePlaylist(req: Request, res: Response) {
    try {
      await this.playlistService.deletePlaylist(+req.params.id);

      return new SuccessResult({
        msg: 'Playlist successfully deleted.',
      }).handle(res);
    } catch (error) {
      let errorMessage = 'Failed to delete the playlist.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return new FailureResult({
        msg: errorMessage,
        code: 500,
        msgCode: 'failure',
      }).handle(res);
    }
  }
  private async updatePlaylist(req: Request, res: Response) {
    try {
      const updatedPlaylist = await this.playlistService.updatePlaylist(+req.params.id, req.body);

      if (!updatedPlaylist) {
        return new FailureResult({
          msg: 'Playlist not found.',
          code: 404,
          msgCode: 'failure',
        }).handle(res);
      }

      return new SuccessResult({
        msg: 'Playlist successfully updated.',
        data: updatedPlaylist,
      }).handle(res);
    } catch (error) {
      let errorMessage = 'Failed to update the playlist.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return new FailureResult({
        msg: errorMessage,
        code: 500,
        msgCode: 'failure',
      }).handle(res);
    }
  }
  private async createPlaylist(req: Request, res: Response) {
    try {
      const newPlaylist = await this.playlistService.createPlaylist(req.body);

      return new SuccessResult({
        msg: 'Playlist successfully created.',
        data: newPlaylist,
      }).handle(res);
    } catch (error) {
      let errorMessage = 'Failed to create the playlist.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return new FailureResult({
        msg: errorMessage,
        code: 500,
        msgCode: 'failure',
      }).handle(res);
    }
  }
  private async removeLikeFromPlaylist(req: Request, res: Response) {
    try {
      await this.playlistService.removeLikeFromPlaylist(+req.params.id, +req.params.userId);
      return new SuccessResult({
        msg: 'Successfully removed like from playlist.',
      }).handle(res);
    } catch (error) {
      let errorMessage = 'Failed to remove like from playlist.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return new FailureResult({
        msg: errorMessage,
        code: 500,
        msgCode: 'failure',
      }).handle(res);
    }
  }
  private async addLikeToPlaylist(req: Request, res: Response) {
    try {
      await this.playlistService.addLikeToPlaylist(+req.params.id, +req.params.userId);
      return new SuccessResult({
        msg: 'Successfully added like to playlist.',
      }).handle(res);
    } catch (error) {
      let errorMessage = 'Failed to add like to playlist.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return new FailureResult({
        msg: errorMessage,
        code: 500,
        msgCode: 'failure',
      }).handle(res);
    }
  }
  private async getPlaylistLikesDetails(req: Request, res: Response) {
    try {
      const playlistLikesDetails = await this.playlistService.getPlaylistLikesDetails(
        +req.params.id,
      );
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: playlistLikesDetails,
      }).handle(res);
    } catch {
      return new FailureResult({
        msg: Result.transformRequestOnMsg(req),
        code: 404,
        msgCode: 'failure',
      }).handle(res);
    }
  }
  private async getLikesForAllPlaylists(req: Request, res: Response) {
    try {
      const likes = await this.playlistService.getPlaylistLikes();
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: likes,
      }).handle(res);
    } catch {
      return new FailureResult({
        msg: Result.transformRequestOnMsg(req),
        code: 500,
        msgCode: 'failure',
      }).handle(res);
    }
  }

  private async addMusicToPlaylist(req: Request, res: Response) {
    try {
      const playlist = await this.playlistService.addMusicToPlaylist(
        +req.params.id,
        +req.params.idMusica,
        // req.body
      );
      return new SuccessResult({
        msg: 'pegou',
        data: playlist,
      }).handle(res);
    } catch (error) {
      let errorMessage = 'Failed to update the playlist.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return new FailureResult({
        msg: errorMessage,
        code: 500,
        msgCode: 'failure',
      }).handle(res);
    }
  }

  private async deleteMusicFromPlaylist(req: Request, res: Response) {
    try {
      const playlist = await this.playlistService.deleteMusicFromPlaylist(
        +req.params.id,
        +req.params.idMusica,
      );
      return new SuccessResult({
        msg: 'pegou',
        data: playlist,
      }).handle(res);
    } catch (error) {
      let errorMessage = 'Failed to delete the playlist.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return new FailureResult({
        msg: errorMessage,
        code: 500,
        msgCode: 'failure',
      }).handle(res);
    }
  }
}

export default PlaylistController;
