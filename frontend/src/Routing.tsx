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
        <Route path='/test' element={<BrowseArtists />} />
        <Route path='/user/:id/playlist' element={<Playlists />} /> {/*playlists do usuario*/}
        <Route path='/user/:id/playlist/:idPlaylist' element={<Playlist />} /> {/*playlist x do usuario*/}
      </Routes>
      <CurrentSong />
    </BrowserRouter>
  );
};

export default Routing;
