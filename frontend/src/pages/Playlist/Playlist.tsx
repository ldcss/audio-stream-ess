import { Box, CircularProgress, Table, Modal, Typography, Popover } from "@mui/material";
import Sidemenu from "../../components/Sidemenu/Sidemenu";
import { BoxLikes, ContainerPlaylist, CustomTableCell, ImgDiv, IndexTableCell, NameTableCell, StyledBox, StyledImg, StyledModal, StyledTable, StyledTypography, WhiteTableCell } from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlaylistService } from "../../services/PlaylistService";
import { PlaylistDto } from "../../types/playlistTypes";
import creatorIcon from "../../assets/creatorIcon.svg"
import trashIcon from "../../assets/trash.svg"
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


function Playlist() {
  const { idUser, idPlaylist } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistDto | null>(null);
  const [playlistById, setPlaylistById] = useState<PlaylistDto | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [musicModel, setMusicModel] = useState<Array<{ id: number; name: string; artist: number; album: string; duration: string }>>([])
  const [likedUsers, setLikedUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [musicas, SetMusicas] = useState<Array<{ id: number; name: string; artist: number; album: string; duration: string; }>>([]);
  const [allMusics, setAllMusics] = useState<Array<{ id: number; name: string; }>>([]);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  type LikeAction = "add" | "remove" | "fetch";

  function msToHMS(ms: number) {
    let seconds = ms / 1000;
    const hours = Math.trunc(seconds/3600);
    seconds = seconds % 3600;
    const minutes = Math.trunc(seconds/60);
    seconds = seconds % 60;
    if(hours>0)
      return `${hours}h ${minutes}min ${seconds}s`;
    return `${minutes}min ${seconds}s`;
  }

  const open = Boolean(anchorEl);

  const handleModal = () => {
    if (!openModal) {

      manageLikes("fetch");
    }
    setOpenModal(!openModal);
  };

  async function manageLikes(action: LikeAction) {
    try {
      switch (action) {
        case "add":
          await api.post(`playlist/${idPlaylist}/likes/${idUser}`);
          setUserHasLiked(true);
          break;
        case "remove":
          await api.delete(`playlist/${idPlaylist}/likes/${idUser}`);
          setUserHasLiked(false);
          break;
        case "fetch":
          if (!idPlaylist || !idUser) {
            console.error("Playlist or User ID is missing.");
            return;
          }
          const response = await api.get(`playlist/${idPlaylist}/likes`);
          const likedUsers = response.data.data.users;
          const currentUserHasLiked = likedUsers.some((user: { id: number; }) => user.id === +idUser);
          setLikedUsers(likedUsers);
          setUserHasLiked(currentUserHasLiked);
          break;
      }
    } catch (error) {
      console.error("Erro na gestão dos likes:", error);
    }
  }

  const removeMusicFromPlaylist = async (idMusica: any) => {
    try {
      await api.delete(`playlist/${idPlaylist}/musica/${idMusica}`);
      setUserHasLiked(false);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao remover música da playlist:", error);
    }
  }

  const addMusicToPlaylist = async (idMusica: any) => {
    try {
      await api.post(`playlist/${idPlaylist}/musica/${idMusica}`);
      setUserHasLiked(false);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao remover música da playlist:", error);
    }
  }
  
  const [openOther, setOpenOther] = useState(false);
  const handleOpen = () => {
    setOpenOther(true);
  };
  const handleClose = () => {
    setOpenOther(false);
  };

  useEffect(() => {
    async function getPlaylist(id: number, idPlaylist: number) {
      PlaylistService.getPlaylistFromUser(id, idPlaylist).then((response) => {
        setPlaylist(response.data);
        manageLikes("fetch");
      }).catch((e) => console.log('erro: ' + e));
    }

    async function getPlaylistById(idPlaylist: number) {
      try {
        const respostaFinal: { id: number; name: string; artist: number; album: string; duration: string; }[] = [];
        const result = await api.get(`playlist/${idPlaylist}`);
        const res = result.data.data[0];

        res.forEach((element: {
          id: number,
          name: string,
          description: string,
          duration: string,
          albumId: number,
          createdAt: string,
          album: {
            id: number,
            name: string,
            description: string,
            createdAt: string,
            artistId: number,
            released: boolean
          }
        }): any => {
          respostaFinal.push({
            id: element.id,
            name: element.name,
            artist: element.album.artistId,
            album: element.album.name,
            duration: element.duration
          })

          SetMusicas(respostaFinal)
        });
      } catch (error) {
        console.error("Erro ao dar fetch músicas da playlist", error);
      }

      PlaylistService.getPlaylistById(idPlaylist).then((response) => {
        setPlaylistById(response.data);
        console.log('deu certo!');
      }).catch((e) => console.log('erro: ' + e));
    }

    async function fetchMusic() {

      try {
        const respostaFinal: { id: number; name: string; }[] = [];
        const response = await api.get(`music`);
        const res = response.data.data;
        res.forEach((element: {
          id: number,
          name: string,
          description: string,
          duration: string,
          albumId: number,
          createdAt: string
        }): any => {
          respostaFinal.push({
            id: element.id,
            name: element.name
          })
        });
        setAllMusics(respostaFinal)

      } catch (error) {
        console.error("Erro solicitar músicas.", error);
      }
    }

    if (idUser && idPlaylist)
      getPlaylist(+idUser, +idPlaylist);
    if (idPlaylist) {
      getPlaylistById(+idPlaylist)
      fetchMusic()
    }

  }, []);

  return (<div style={{ width: '100vw', height: '100%', minHeight: '100vh' }}>

    <Box style={{ display: 'flex', flexDirection: 'row', height: '100%', minHeight: '100vh' }}>
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

            {<Box sx={{
              display: 'flex', flexDirection: 'row', width: '95%', justifyContent: 'flex-start', paddingLeft: '100px',
              paddingBottom: '20px'
            }}>
              <Box flex={1} sx={{ display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
                <StyledImg
                  src={userHasLiked ? likeIcon : deslikeIcon}
                  onClick={() => manageLikes(userHasLiked ? "remove" : "add")}
                  alt='like'
                />
                <p onClick={handleModal} style={{ cursor: 'pointer' }}>Curtidas</p>
              </Box>
              <Box flex={1} sx={{ display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
                <img src={musicIcon} alt='music' />
                <p>Músicas</p>
              </Box>
              <Box flex={1} sx={{  display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
              <img src={timeIcon} alt='time' />
              <p>Duração: {playlist && msToHMS(playlist.duration)}</p>
              </Box>
              <Box id="share_link_button" flex={1} sx={{ display: 'flex', flexDirection: 'row', columnGap: '15px', ':hover': { cursor: 'pointer' } }}
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                  setTimeout(() => {
                    navigator.clipboard.writeText(window.location.href);
                    setAnchorEl(null);
                  }, 1000);
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
            </Box>}


            <TableContainer component={Paper} sx={{ backgroundColor: "#BC9EC1", paddingBottom: "100px", width: '100%', overflowY: 'scroll', height: '500px' }}>
              <Table sx={{ minWidth: 200, backgroundColor: '#1E1E1E', marginLeft: '20px', width: '97%', borderRadius: '15px' }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ marginLeft: '10px' }}>
                    <TableCell align="center" sx={{ color: 'white' }}>Título</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>Artista</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>Álbum</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>Duração</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>Remover</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {musicas.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center" sx={{ color: 'white' }}>{row.name}</TableCell>
                      <TableCell align="center" sx={{ color: 'white' }}>{row.artist}</TableCell>
                      <TableCell align="center" sx={{ color: 'white' }}>{row.album}</TableCell>
                      <TableCell align="center" sx={{ color: 'white' }}>{row.duration}</TableCell>
                      <TableCell align="center" sx={{ color: 'white' }}><a role="button" style={{ cursor: "pointer" }} onClick={() => removeMusicFromPlaylist(row.id)}><img src={trashIcon} style={{ height: "30px" }} alt='like' /></a></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
                <button onClick={handleOpen} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E', width: '15%', height: '100%', borderRadius: '200px' }}>
                  <img src={addCircle} alt='like' style={{ height: '30px', width: '30px' }} />   Adicionar música
                </button>
              </div>
            </TableContainer>

          </Box>
        </Box>) : (<CircularProgress sx={{ margin: 'auto' }} />)}
      </ContainerPlaylist>
    </Box>

    <Modal open={openOther} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{
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
            Adicionar música
          </Typography>
          <img src={xIcon} alt="Fechar" style={{ cursor: 'pointer' }} onClick={handleClose} />
        </Box>

        {
          <Table sx={{ backgroundColor: '#1F2232', borderRadius: '8px', mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ color: 'white' }}>------ Lista de músicas ------</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allMusics.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center" sx={{ color: 'white' }}><a role="button" style={{ cursor: "pointer" }} onClick={() => addMusicToPlaylist(row.id)}>{row.name}</a></TableCell>
                </TableRow>
              ))}
            </TableBody >
          </Table>
        }
      </Box>
    </Modal>


    <StyledModal open={openModal} onClose={handleModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      <StyledBox>
        <BoxLikes>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Curtidas
          </Typography>
          <StyledImg src={xIcon} alt="Fechar"  onClick={handleModal} />
        </BoxLikes>
        {likedUsers.length === 0 ?
          <StyledTypography id="modal-modal-description">
          Ninguém curtiu essa playlist ainda.
          </StyledTypography>:
          <StyledTable >
            <TableHead>
              <TableRow>
              <WhiteTableCell>#</WhiteTableCell>
              <CustomTableCell>Nome</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {likedUsers.map((user, index) => (
               <TableRow key={user.id}>
               <IndexTableCell>{index + 1}</IndexTableCell>
               <NameTableCell>{user.name}</NameTableCell>
           </TableRow>          
              ))}
            </TableBody>
          </StyledTable>
        }
      </StyledBox>
    </StyledModal>

  </div >
  )
}

export default Playlist;