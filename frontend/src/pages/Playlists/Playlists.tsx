import {
  Box,
  FormControl,
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
import { ContainerPlaylist, DividerFilter } from './styles';
import { MouseEventHandler, useEffect, useState } from 'react';
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
    }).catch((e) => console.log('error', e));
  },[]);

  useEffect(() => {
    console.log(genre, duration);
    PlaylistService.getAllPlaylistsWithMusics(genre, duration).then((response) => {
      console.log('responsedata', response.data)
      setPlaylists(response.data);
    }).catch((e) => console.log('error', e));
  }, [duration, genre]);

  useEffect(() => {
    console.log('playlists', playlists);
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100%', width: '100vw', padding: '0px !important' }}>
      <Navbar />
      <Box style={{ display: 'flex', flexDirection: 'row', height: '100%', minHeight: '100vh', paddingBottom: '90px'}}>
        <Sidemenu />
        <ContainerPlaylist>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              columnGap: '50px',
              justifyContent: 'flex-end'
            }}
            >
            <h2 style={{marginRight: 'auto', marginLeft: '20px'}}>Biblioteca</h2>
            <FormControl
              sx={{
                width: '200px',
                height: '60%',
              }}
            >
              <InputLabel>Gênero</InputLabel>
              <Select value={genre} label='Gênero' onChange={handleChangeGenre} >
                <MenuItem value={'mpb'}>MPB</MenuItem>
                <MenuItem value={'rock'}>Rock</MenuItem>
                <MenuItem value={'rap'}>Rap</MenuItem>
                <MenuItem value={'pop'}>Pop</MenuItem>
                <MenuItem value={'grime'}>Grime</MenuItem>
                <MenuItem value={'drill'}>Drill</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: '200px',
                height: '60%',
              }}
            >
              <InputLabel>Duração</InputLabel>
              <Select value={duration} label='Duração' onChange={handleChangeDuration} >
                <MenuItem value={'1800000'}>{'< 30m'}</MenuItem>
                <MenuItem value={'3600000'}>{'< 1h'}</MenuItem>
                <MenuItem value={'7200000'}>{'< 2h'}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <DividerFilter />
          <Grid display={'flex'} flexDirection={'row'} flexWrap={'wrap'} item lg={4} md={4} mt={'20px'} gap={'35px'}>
            {playlists.map(playlist => {
              return (
              <Link to={`/user/${playlist.ownerId}/playlist/${playlist.id}`}>
                <ScopedCssBaseline>
                <Box sx={{height: '200px', width: '160px', backgroundColor: '#BC9EC1'}}>
                  <Box sx={{height: '160px', width: '160px', backgroundColor: '#1F2232', borderRadius: '35px'}} />
                  <Typography>{playlist.name}</Typography>
                </Box>
                </ScopedCssBaseline>
              </Link>
              )
            })}
          </Grid>
        </ContainerPlaylist>
      </Box>
    </div>
  );
}

export default Playlists;