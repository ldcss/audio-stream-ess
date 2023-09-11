import { Wrapper } from './styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from 'material-ui-search-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowseArtists = () => {
  const [searched, setSearched] = useState<string>('');
  const [rows, setRows] = useState<any[]>([]);
  const [showRows, setShowRows] = useState<any[]>([]);

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
  }, []);

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
            {showRows.map(row => (
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
                <TableCell className='cell'>{row.description}</TableCell>
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
