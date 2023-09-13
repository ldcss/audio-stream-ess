import { Box, CircularProgress, Table, Modal, Typography, Button, Popover } from "@mui/material";
import Sidemenu from "../../components/Sidemenu/Sidemenu";
import { ContainerPlaylist, ImgDiv } from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlaylistService } from "../../services/PlaylistService";
import { PlaylistDto } from "../../types/playlistTypes";
import creatorIcon from "../../assets/creatorIcon.svg"
import dateIcon from "../../assets/dateIcon.svg"
import likeIcon from "../../assets/likeIcon.svg"
import deslikeIcon from "../../assets/deslikeIcon.svg"
import musicIcon from "../../assets/musicIcon.svg"
import shareIcon from "../../assets/shareIcon.svg"
import xIcon from "../../assets/x.svg"
import timeIcon from "../../assets/timeIcon.svg"
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import addCircle from "../../assets/addCircle.svg"
import api from '../../services/api';


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
  const [playlist, setPlaylist] = useState<PlaylistDto | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [likedUsers, setLikedUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const open = Boolean(anchorEl);

  const handleModal = () => {
    if (!openModal) {
      
      fetchLikedUsers();
    }
    setOpenModal(!openModal);
  };
  
  const fetchLikedUsers = async () => {
    
    if (!idPlaylist || !idUser) {
      console.error("Playlist or User ID is missing.");
      return;
  }
    try {
        const response = await api.get(`playlist/${idPlaylist}/likes`);
        console.log("API Response PEGA PF:", response.data.data.users);
        const likedUsers = response.data.data.users;
        const currentUserHasLiked = likedUsers.some((user: { id: number; }) => user.id === +idUser);
        setLikedUsers(likedUsers);
        setUserHasLiked(currentUserHasLiked);

    } catch (error) {
        console.error("Erro ao buscar usuários que curtiram a playlist:", error);
    }
  }
  const addLike = async (idPlaylist: any, idUser: any) => {
    try {
      await api.post(`playlist/${idPlaylist}/likes/${idUser}`);
      setUserHasLiked(true);
      console.log(`Like adicionado à playlist ${idPlaylist} pelo usuário ${idUser}`);
    } catch (error) {
      console.error("Erro ao adicionar like à playlist:", error);
    }
  }
  const removeLike = async (idPlaylist: any, idUser: any) => {
    try {
      await api.delete(`playlist/${idPlaylist}/likes/${idUser}`);
      setUserHasLiked(false);
      console.log(`Like removido da playlist ${idPlaylist} pelo usuário ${idUser}`);
    } catch (error) {
      console.error("Erro ao remover like da playlist:", error);
    }
}

  useEffect(() => {
    async function getPlaylist(id: number, idPlaylist: number) {
      PlaylistService.getPlaylistFromUser(id, idPlaylist).then((response) => {
        setPlaylist(response.data);
        fetchLikedUsers();
        console.log('deu certo!');
      }).catch((e) => console.log('erro: ' + e));
    }
    if (idUser && idPlaylist)
      getPlaylist(+idUser, +idPlaylist);
  }, []);

  return (<div style={{width:'100vw', height:'100%'}}>
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
                <img 
                src={userHasLiked ? likeIcon : deslikeIcon}
                onClick={() => userHasLiked ? removeLike(idPlaylist, idUser) : addLike(idPlaylist, idUser)}  
                alt='like'
                style={{cursor: 'pointer'}} 
                />
                <p onClick={handleModal} style={{cursor: 'pointer'}}>Curtidas</p>
              </Box>
              <Box flex={1} sx={{  display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
              <img src={musicIcon} alt='music' />
              <p>Musicas</p>
              </Box>
              <Box flex={1} sx={{  display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
              <img src={timeIcon} alt='time' />
              <p>Minutos</p>
              </Box>
              <Box flex={1} sx={{  display: 'flex', flexDirection: 'row', columnGap: '15px', ':hover': {cursor: 'pointer'}}} 
                onClick={(event) => {
                  navigator.clipboard.writeText(window.location.href);
                  setAnchorEl(event.currentTarget);
                  setTimeout(() => setAnchorEl(null), 2000);
                  }}>
                  <Popover
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                  >
                    <Typography sx={{ p: 2 }}>Link copiado para clipboard!</Typography>
                  </Popover>
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
    <Modal open={openModal} onClose={handleModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{
      border: '2px solid #BC9EC1'
    }}>
    <Box 
    sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '600px',
        bgcolor: '#BC9EC1', 
        border: '2px solid #BC9EC1', 
        boxShadow: 24,
        borderRadius: 5, 
        p: 4,
        overflow: 'auto'
    }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Curtidas
            </Typography>
            <img src={xIcon} alt="Fechar" style={{ cursor: 'pointer' }} onClick={handleModal} />
        </Box>
        
        {likedUsers.length === 0 ? 
            <Typography id="modal-modal-description" sx={{ mt: 2, paddingBottom: 2 }}>
                Ninguém curtiu essa playlist ainda.
            </Typography> : 
            <Table sx={{backgroundColor: '#1F2232', borderRadius: '8px', mt: 2}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }}>#</TableCell>
                        <TableCell sx={{color: 'white',}}>Nome</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {likedUsers.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell sx={{ width: '40px', color: 'white', borderBottom:'none' }}>
                                {index + 1}
                            </TableCell>
                            <TableCell sx={{ color: 'white', borderBottom:'none' }}>
                                {user.name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody >
            </Table>
        }
    </Box>
</Modal>

  </div>
  )
}

export default Playlist;