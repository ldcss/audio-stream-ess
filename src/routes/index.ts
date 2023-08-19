import { Express, Router } from "express";
import { di } from "../di";
import TestController from "../controllers/test.controller";
import TestService from "../services/test.service";
import ArtistController from "../controllers/artist.controller";
import ArtistService from "../services/artist.service";

const router = Router();
const prefix = "/api";

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new ArtistController(router, di.getService(ArtistService)).router
  );
};
