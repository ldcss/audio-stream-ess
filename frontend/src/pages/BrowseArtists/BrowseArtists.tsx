<<<<<<< HEAD
import { Wrapper } from './styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from 'material-ui-search-bar';
import React, { useState } from 'react';

function createData(name: string, desc: string, albuns: number, songs: number) {
  return { name, desc, albuns, songs };
}

const artistRows = [
  createData('Nome do artista 1', 'Descrição do artista 1', 6.0, 24),
  createData('Nome do artista 2', 'Descrição do artista 2', 9.0, 37),
  createData('Nome do artista 3', 'Descrição do artista 3', 16.0, 24),
  createData('Nome do artista 4', 'Descrição do artista 4', 3.7, 67),
  createData('Nome do artista 5', 'Descrição do artista 5', 16.0, 49),
];

const BrowseArtists = () => {
  const [searched, setSearched] = useState<string>('');
  const [rows, setRows] = useState<any[]>(artistRows);

  const requestSearch = (searchedVal: string) => {
    const filteredartistRows = artistRows.filter(row => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredartistRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  return (
    <Wrapper>
      <h3>Gerenciamento de artistas</h3>
      <SearchBar
        value={searched}
        onChange={searchVal => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder='Nome do artista'
      />
      <TableContainer component={Paper} className='tableContainer'>
        <Table sx={{ minWidth: 650 }} aria-label='simple table' className='table'>
          <TableHead className='head' sx={{ padding: '2rem !important' }}>
            <TableRow className='headRow'>
              <TableCell className='cell'>Nome do artista</TableCell>
              <TableCell className='cell'>Descrição do artista</TableCell>
              <TableCell className='cell'>Álbuns</TableCell>
              <TableCell className='cell'>Músicas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            className='body'
            sx={{
              'row-th': { borderRadius: '50%', padding: '2rem !important' },
            }}
          >
            {rows.map(row => (
              <TableRow
                className='row-th bodyRow'
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell className='cell'>{row.desc}</TableCell>
                <TableCell className='cell'>{row.albuns}</TableCell>
                <TableCell className='cell'>{row.songs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
=======
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { PlaylistLikesDetail } from '../../types/playlistTypes';
import { PlaylistService } from '../../services/PlaylistService';


type Playlist = {
  id: number;
  name: string;
  genre: string;
  description: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  
};


const BrowseArtists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [likedPlaylists, setLikedPlaylists] = useState<number[]>([]);
  const [likesDetails, setLikesDetails] = useState<{ [key: number]: PlaylistLikesDetail }>({});
  const [likesCount, setLikesCount] = useState(0);
  const fetchPlaylists = async () => {
    try {
      const response = await api.get('/playlist')
      setPlaylists(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar playlists:", error);
    }
  }

  const fetchLikesDetails = async (playlistId: number) => {
    try {
      const response = await api.get(`playlist/${playlistId}/likes`);
      console.log(`Fetched likes details for playlist ${playlistId}:`, response.data);
  
      setLikesDetails(prevDetails => ({ ...prevDetails, [playlistId]: response.data.data }));
    } catch (error) {
      console.error("Erro ao buscar detalhes dos likes:", error);
    }
  };
  

  


 
  useEffect(() => {
    fetchPlaylists();
  
  }, []);

  const userId = 2; 
  

  const handleLikeClick = async (playlistId: any) => {
      try {
          const response = await api.post(`playlist/${playlistId}/likes/${userId}`);
  
          if (response.status === 200) {
              alert('Curtida adicionada com sucesso!');
              setLikesCount(prevCount => prevCount + 1);
              setLikedPlaylists(prevLiked => [...prevLiked, playlistId]); 
              await fetchPlaylists();
          } else {
              alert('Erro ao curtir!');
          }
      } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
      }
  };
  
  const handleUnlikeClick = async (playlistId: any) => {
      try {
          const response = await api.delete(`playlist/${playlistId}/likes/${userId}`);
  
          if (response.status === 200) {
              alert('Curtida removida com sucesso!');
              setLikesCount(prevCount => prevCount - 1);
              setLikedPlaylists(prevLiked => prevLiked.filter(id => id !== playlistId));
              await fetchPlaylists();
          } else {
              alert('Erro ao remover a curtida!');
          }
      } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
      }
  };
  


  return (
    <>
      <div>
        <h1>Teste2</h1>
        <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>
            {playlist.name}

            {likedPlaylists.includes(playlist.id) 
              ? <button onClick={() => handleUnlikeClick(playlist.id)}>Descurtir</button>
              : <button onClick={() => handleLikeClick(playlist.id)}>Curtir</button>
            }

            <button onClick={() => fetchLikesDetails(playlist.id)}>Mostrar quem curtiu</button>

            {likesDetails[playlist.id] && (
                <div>
                  <p>Likes count: {likesDetails[playlist.id].count}</p>
                  <ul>
                    {likesDetails[playlist.id].users.map(user => <li key={user.id}>{user.name}</li>)}
                  </ul>
                </div>
              )}

              <span>{likesCount} curtidas</span>
            </li>
          ))}


          </ul>
        </div>
      </>
    );
>>>>>>> caea027 (feat: integracao do axios frontend/backend)
};

export default BrowseArtists;
