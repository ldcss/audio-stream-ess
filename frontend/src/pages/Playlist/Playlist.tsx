import { Box, CircularProgress, Container, Table } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidemenu from "../../components/Sidemenu/Sidemenu";
import { ContainerPlaylist, ImgDiv } from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlaylistService } from "../../services/PlaylistService";
import { PlaylistDto } from "../../types/playlistTypes";
import creatorIcon from "../../assets/creatorIcon.svg"
import dateIcon from "../../assets/dateIcon.svg"
import likeIcon from "../../assets/likeIcon.svg"
import musicIcon from "../../assets/musicIcon.svg"
import shareIcon from "../../assets/shareIcon.svg"
import timeIcon from "../../assets/timeIcon.svg"
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircle from "@mui/icons-material/AddCircle";
import addCircle from "../../assets/addCircle.svg"


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),

];

function Playlist() {
  const { idUser, idPlaylist } = useParams();
  console.log(idUser, idPlaylist);
  const [playlist, setPlaylist] = useState<PlaylistDto | null>(null);
  useEffect(() => {
    async function getPlaylist(id: number, idPlaylist: number) {
      PlaylistService.getPlaylistFromUser(id, idPlaylist).then((response) => {
        setPlaylist(response.data);
        console.log('deu certo!');
      }).catch((e) => console.log('erro: ' + e));
    }
    if (idUser && idPlaylist)
      getPlaylist(+idUser, +idPlaylist);
  }, []);

  return (<div style={{width:'99.2vw', height:'100%'}}>

    <Box style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <Sidemenu />
      <ContainerPlaylist>
        {playlist ? (<Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <ImgDiv />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'flex-start', marginLeft: '20px !important' }}>
            <h2>{playlist.name}</h2>
            <h3>{playlist.description}</h3>
            <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
              <img src={creatorIcon} alt='like' />
              <h3>{playlist.owner?.name}</h3>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
              <img src={dateIcon} alt='like' />
              <h3>{new Date(playlist.createdAt.toString()).toLocaleString().split(',')[0]}</h3>
            </Box>

            { <Box sx={{ display: 'flex', flexDirection: 'row', width: '95%', justifyContent: 'flex-start', paddingLeft: '100px',
          paddingBottom: '20px' }}>
              <Box flex={1} sx={{  display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
                <img src={likeIcon} alt='like' />
                <p>Curtidas</p>
              </Box>
              <Box flex={1} sx={{  display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
              <img src={musicIcon} alt='music' />
              <p>Musicas</p>
              </Box>
              <Box flex={1} sx={{  display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
              <img src={timeIcon} alt='time' />
              <p>Minutos</p>
              </Box>
              <Box flex={1} sx={{  display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
              <img src={shareIcon} alt='share' />
              <p>Compartilhe</p>
              </Box>
              <Box flex={1} sx={{ backgroundColor: '#FDE8E9', borderRadius: '35px', border: '0.5px solid pink' }}></Box>
            </Box> }


            <TableContainer component={Paper} sx={{backgroundColor: "#BC9EC1", paddingBottom:"100px", width: '100%' }}>
              <Table sx={{ minWidth: 200, backgroundColor: '#1E1E1E', marginLeft:'20px', width:'97%', borderRadius:'15px'}} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{marginLeft:'10px'}}>
                    <TableCell align="center" sx={{color: 'white'}}>Título</TableCell>
                    <TableCell align="center" sx={{color: 'white'}}>Artista</TableCell>
                    <TableCell align="center" sx={{color: 'white'}}>Álbum</TableCell>
                    <TableCell align="center" sx={{color: 'white'}}>Duração</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center" sx={{color: 'white'}}>{row.calories}</TableCell>
                      <TableCell align="center" sx={{color: 'white'}}>{row.fat}</TableCell>
                      <TableCell align="center" sx={{color: 'white'}}>{row.protein}</TableCell>
                      <TableCell align="center" sx={{color: 'white'}}>{row.carbs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', marginTop:'15px'}}>
                <button style={{display: 'flex', justifyContent: 'center', alignItems:'center', backgroundColor:'#1E1E1E', width: '15%', height:'100%',  borderRadius:'200px'}}>
                  <img src={addCircle} alt='like' style={{height:'30px', width:'30px'}}/>   Adicionar música
                </button>
              </div>
            </TableContainer>

          </Box>
        </Box>) : (<CircularProgress sx={{ margin: 'auto' }} />)}
      </ContainerPlaylist>
    </Box>
  </div>
  )
}

export default Playlist;