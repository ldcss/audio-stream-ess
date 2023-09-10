import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage, BrowseArtists } from './pages';
import { CurrentSong } from './components';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignInPage />} />
        <Route path='/artists' element={<BrowseArtists />} />
      </Routes>
      <CurrentSong />
    </BrowserRouter>
  );
};

export default Routing;
