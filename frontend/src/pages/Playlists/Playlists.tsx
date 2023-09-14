import {
  Grid,
  InputLabel,
  MenuItem,
  ScopedCssBaseline,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Sidemenu from '../../components/Sidemenu/Sidemenu';
import { ContainerPlaylist, DividerFilter, Container, Wrapper, FlexRowSelects, Title, FormControlFilter, BoxPlaylist, ImgPlaylistDiv } from './styles';
import { useEffect, useState } from 'react';
import { PlaylistService } from '../../services/PlaylistService';
import { PlaylistDto } from '../../types/playlistTypes';
import { Link } from 'react-router-dom';

function Playlists(): JSX.Element {
  const [genre, setGenre] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [playlists, setPlaylists] = useState<PlaylistDto[]>([]);
  const handleChangeGenre = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };
  const handleChangeDuration = (event: SelectChangeEvent) => {
    setDuration(event.target.value as string);
  };
  useEffect(() => {
    PlaylistService.getAllPlaylistsWithMusics(genre, duration).then((response) => {
      setPlaylists(response.data);
    }).catch((e) => alert(`error:${e} when load playlists`));
  },[]);

  useEffect(() => {
    console.log(genre, duration);
    PlaylistService.getAllPlaylistsWithMusics(genre, duration).then((response) => {
      setPlaylists(response.data);
    }).catch((e) => alert(`error:${e} when load playlists`));
  }, [duration, genre]);

  const AllPlaylists = playlists.map(playlist => {
    return (
    <Link to={`/user/${playlist.ownerId}/playlist/${playlist.id}`}>
      <ScopedCssBaseline>
      <BoxPlaylist>
        <ImgPlaylistDiv />
        <Typography>{playlist.name}</Typography>
      </BoxPlaylist>
      </ScopedCssBaseline>
    </Link>
    )
  })

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Sidemenu />
        <ContainerPlaylist>
          <FlexRowSelects>
            <Title>Biblioteca</Title>
            <FormControlFilter>
              <InputLabel>Gênero</InputLabel>
              <Select value={genre} label='Gênero' onChange={handleChangeGenre} >
                <MenuItem value={'mpb'}>MPB</MenuItem>
                <MenuItem value={'rock'}>Rock</MenuItem>
                <MenuItem value={'rap'}>Rap</MenuItem>
                <MenuItem value={'pop'}>Pop</MenuItem>
                <MenuItem value={'grime'}>Grime</MenuItem>
                <MenuItem value={'drill'}>Drill</MenuItem>
              </Select>
            </FormControlFilter>
            <FormControlFilter>
              <InputLabel>Duração</InputLabel>
              <Select value={duration} label='Duração' onChange={handleChangeDuration} >
                <MenuItem value={'1800000'}>{'< 30m'}</MenuItem>
                <MenuItem value={'3600000'}>{'< 1h'}</MenuItem>
                <MenuItem value={'7200000'}>{'< 2h'}</MenuItem>
              </Select>
            </FormControlFilter>
          </FlexRowSelects>
          <DividerFilter />
          <Grid display={'flex'} flexDirection={'row'} flexWrap={'wrap'} item lg={4} md={4} mt={'20px'} gap={'35px'}>
            {AllPlaylists}
          </Grid>
        </ContainerPlaylist>
      </Wrapper>
    </Container>
  );
}

export default Playlists;