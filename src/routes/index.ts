import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import AlbumController from '../controllers/album.controller';
import PlaylistManutencao from '../controllers/manutencaoPlaylist.controller'

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router,
    new AlbumController(router, di.getService(TestService)).router,
    new PlaylistManutencao(router, di.getService(TestService)).router
  );
};
