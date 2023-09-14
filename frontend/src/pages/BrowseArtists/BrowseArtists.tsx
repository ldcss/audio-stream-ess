import { Wrapper, EditPopup, DeletePopup } from './styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from 'material-ui-search-bar';
import Settings from '@mui/icons-material/Settings';
import Delete from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Artist {
  id: number;
  name: string;
  genre?: string;
  email: string;
  password: string;
  description?: string;
  albums?: number;
  songs?: number;
}

const BrowseArtists = () => {
  const [searched, setSearched] = useState<string>('');
  const [rows, setRows] = useState<any[]>([]);
  const [showRows, setShowRows] = useState<any[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [reload, setReload] = useState(true);
  const [currentArtist, setCurrentArtist] = useState<Artist>({
    genre: '',
    name: '',
    email: '',
    password: '',
    id: -1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/artist');
        setRows(response.data.data);
        setShowRows(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [reload]);

  const requestSearch = (searchedVal: string) => {
    const filteredartistRows = rows.filter(row => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setShowRows(filteredartistRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  const formatDescription = (text: string): string => {
    if (text.length <= 50) return text;
    return text.substring(0, 49) + '...';
  };

  const editArtist = (index: number) => {
    setCurrentArtist(rows[index]);
    setShowEdit(true);
  };

  const deleteArtist = (index: number) => {
    setCurrentArtist(rows[index]);
    setShowDelete(true);
  };

  const handleDeletion = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/artist/${currentArtist.id}`);
      console.log('API Response:', response.data);
      setShowDelete(false);
      setReload(!reload);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = {
      email: currentArtist.email,
      password: currentArtist.password,
      name: e.target.nome.value,
      genre: e.target.genero.value,
      description: e.target.desc.value,
      type: 1,
    };

    try {
      const response = await axios.put(
        `http://localhost:5001/api/artist/${currentArtist.id}`,
        user,
      );
      console.log('API Response:', response.data);
      setShowEdit(false);
      setReload(!reload);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {showEdit && (
        <EditPopup>
          <form onSubmit={handleSubmit}>
            <label>Nome</label>
            <input type='text' name='nome' id='nome' defaultValue={currentArtist.name} />
            <label>Gênero</label>
            <input type='text' name='genero' id='genero' defaultValue={currentArtist.genre} />
            <label>Descrição</label>
            <textarea name='desc' id='desc' defaultValue={currentArtist.description} />
            <div className='buttons'>
              <input type='submit' value='Editar' className='submit' />
              <button onClick={() => setShowEdit(false)}>Cancelar</button>
            </div>
          </form>
        </EditPopup>
      )}
      {showDelete && (
        <DeletePopup>
          <p>Você tem certeza que deseja excluir o artista {currentArtist.name}?</p>
          <div className='buttons'>
            <button onClick={() => handleDeletion()} className='delete'>
              Excluir
            </button>
            <button onClick={() => setShowDelete(false)}>Cancelar</button>
          </div>
        </DeletePopup>
      )}
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
                <TableCell className='cell'>Gênero</TableCell>
                <TableCell className='cell'></TableCell>
                <TableCell className='cell'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              className='body'
              sx={{
                'row-th': { borderRadius: '50%', padding: '2rem !important' },
              }}
            >
              {showRows.map((row, index) => (
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
                  <TableCell className='cell'>{formatDescription(row.description)}</TableCell>
                  <TableCell className='cell'>{row.genre}</TableCell>
                  <TableCell className='cell'>
                    <div onClick={() => editArtist(index)}>
                      <Settings
                        className='settings'
                        sx={{ display: 'block !important', zIndex: 100 }}
                      />{' '}
                    </div>
                  </TableCell>
                  <TableCell className='cell'>
                    <div onClick={() => deleteArtist(index)}>
                      <Delete
                        className='settings'
                        sx={{ display: 'block !important', zIndex: 100 }}
                      />{' '}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </>
  );
};

export default BrowseArtists;
