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
};

export default BrowseArtists;