import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  ScopedCssBaseline,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Sidemenu from '../../components/Sidemenu/Sidemenu';
import { ContainerPlaylist } from './styles';
import { useEffect, useState } from 'react';

function Playlists(): JSX.Element {
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const handleChangeGenre = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };
  const handleChangeDuration = (event: SelectChangeEvent) => {
    setDuration(event.target.value as string);
  };

  useEffect(() => {
    console.log('duration', duration);
    console.log('genre', genre);
  }, [duration, genre]);

  return (
    <Container
      maxWidth={false}
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}
    >
      <Navbar />
      <Box style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 171px)' }}>
        <Sidemenu />
        <ContainerPlaylist>
          <h2>Biblioteca</h2>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              alignItems: 'center',
              columnGap: '50px',
            }}
          >
            <FormControl
              sx={{
                width: '20%',
                height: '100%',
              }}
            >
              <InputLabel>Gênero</InputLabel>
              <Select value={genre} label='Gênero' onChange={handleChangeGenre}>
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
                width: '20%',
                height: '100%',
              }}
            >
              <InputLabel>Duração</InputLabel>
              <Select value={duration} label='Duração' onChange={handleChangeDuration}>
                <MenuItem value={'1800000'}>{'< 30m'}</MenuItem>
                <MenuItem value={'3600000'}>{'< 1h'}</MenuItem>
                <MenuItem value={'7200000'}>{'< 2h'}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </ContainerPlaylist>
      </Box>
    </Container>
  );
}

export default Playlists;
