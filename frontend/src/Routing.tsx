import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage, BrowseArtists } from './pages';
import { CurrentSong } from './components';
import Playlists from './pages/Playlists/Playlists';
import Playlist from './pages/Playlist/Playlist';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignInPage />} />
        <Route path='/artists' element={<BrowseArtists />} />
        <Route path='/user/:idUser/playlist' element={<Playlists />} /> {/*playlists do usuario*/}
        <Route path='/user/:idUser/playlist/:idPlaylist' element={<Playlist />} />{' '}
      </Routes>
      <CurrentSong />
    </BrowserRouter>
  );
};

export default Routing;
