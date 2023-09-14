import { Wrapper, DirectionCard, Cards } from './styles';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import LoginIcon from '@mui/icons-material/Login';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import AlbumIcon from '@mui/icons-material/Album';
import { Blob } from '../../assets';
import { Notes } from '../../assets';

const BrowseArtists = () => {
  return (
    <Wrapper>
      <img src={Blob} className='blob' />
      <img src={Notes} alt='' className='notes' />
      <h3>Spocinfy</h3>
      <h5>O serviço de streaming preferido do Centro de Informática</h5>
      <Cards>
        <a href='http://127.0.0.1:5173/signup'>
          <DirectionCard>
            <h4>Cadastro</h4>
            <p>Junte-se à comunidade e compartilhe suas músicas com o mundo</p>
            <AlignVerticalCenterIcon />
          </DirectionCard>
        </a>
        <a href='http://127.0.0.1:5173/login'>
          <DirectionCard>
            <h4>Login</h4>
            <p>Efetue login para ouvir músicas e interagir com Spocinfy!</p>
            <LoginIcon />
          </DirectionCard>
        </a>
        <a href='http://127.0.0.1:5173/playlist'>
          <DirectionCard>
            <h4>Playlist</h4>
            <p>Visualize, curta e compartilhe playlists de seus artistas favoritos</p>
            <LibraryMusicIcon />
          </DirectionCard>
        </a>
        <a href='http://127.0.0.1:5173/albuns'>
          <DirectionCard>
            <h4>Álbuns</h4>
            <p>Ouça os lançamentos mais recentes de seus artistas favoritos</p>
            <AlbumIcon />
          </DirectionCard>
        </a>
        <a href='http://127.0.0.1:5173/artists'>
          <DirectionCard>
            <h4>Artistas</h4>
            <p>Visualização e gerenciamento de dados de todos os artistas</p>
            <EmojiPeopleIcon />
          </DirectionCard>
        </a>
      </Cards>
    </Wrapper>
  );
};

export default BrowseArtists;
