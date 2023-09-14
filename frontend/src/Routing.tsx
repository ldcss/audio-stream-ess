import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage, BrowseArtists, LoginPage, Home } from './pages';
import { CurrentSong } from './components';
import Playlists from './pages/Playlists/Playlists';
import Playlist from './pages/Playlist/Playlist';
import { PaginaTeste } from './pages/pagina-teste/index';
import { ViewAlbuns } from './pages/Albuns/index';
import { CreateAlbum } from './pages/Albuns/createAlbum';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignInPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/artists' element={<BrowseArtists />} />
        <Route path='/playlist' element={<Playlists />} /> {/*playlists do usuario*/}
        <Route path='/user/:idUser/playlist/:idPlaylist' element={<Playlist />} />
        <Route path='/albuns' element={<ViewAlbuns />} />
        <Route path='/criarAlbum' element={<CreateAlbum />} />
        <Route path='/editarAlbum/:id' element={<CreateAlbum />} />
        <Route path='/pagina-teste' element={<PaginaTeste />} />
      </Routes>
      <CurrentSong />
    </BrowserRouter>
  );
};

export default Routing;
