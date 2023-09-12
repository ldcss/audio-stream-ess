import { Box, CircularProgress, Container} from "@mui/material";
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


function Playlist () {
  const {idUser, idPlaylist} = useParams();
  console.log(idUser, idPlaylist);
  const [playlist, setPlaylist] = useState<PlaylistDto | null>(null);
  useEffect(() => {
    async function getPlaylist(id: number, idPlaylist: number){
      PlaylistService.getPlaylistFromUser(id, idPlaylist).then((response) => {
        setPlaylist(response.data);
        console.log('deu certo!');
      }).catch((e) => console.log('erro: ' + e));
    }
    if(idUser && idPlaylist)
      getPlaylist(+idUser, +idPlaylist);
  }, []);

    return (<Container maxWidth={false} sx={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'}}>
    <Navbar />
    <Box style={{display: 'flex', flexDirection: 'row', height: 'calc(100vh - 171px)'}}>
      <Sidemenu />
      <ContainerPlaylist>
        {playlist ? (<Box sx={{display: 'flex', flexDirection: 'row', border: '1px solid black'}}>
          <ImgDiv />
          <Box sx={{display: 'flex', flexDirection: 'column', border: '1px solid brown', width: '100%', justifyContent: 'center', alignItems: 'flex-start', marginLeft: '20px !important'}}>
              <h2>{playlist.name}</h2>
              <h3>{playlist.description}</h3>
            <Box sx={{display:'flex', flexDirection: 'row', columnGap: '15px'}}>
              <img src={creatorIcon} alt='like'/>
              <h3>{playlist.owner?.name}</h3>
            </Box>
            <Box sx={{display:'flex', flexDirection: 'row', columnGap: '15px'}}>
              <img src={dateIcon} alt='like'/>
              <h3>{new Date(playlist.createdAt.toString()).toLocaleString().split(',')[0]}</h3>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-start'}}>
              <Box flex={1} sx={{border: '0.5px solid red', display:'flex', flexDirection: 'row', columnGap: '15px'}}>
                <img src={likeIcon} alt='like'/>
                <p>Curtidas</p>
              </Box>
              <Box flex={1} sx={{border: '0.5px solid red', display:'flex', flexDirection: 'row', columnGap: '15px'}}>
                <img src={musicIcon} alt='music'/>
                <p>Musicas</p>
              </Box>
              <Box flex={1} sx={{border: '0.5px solid red', display:'flex', flexDirection: 'row', columnGap: '15px'}}>
                <img src={timeIcon} alt='time'/>
                <p>Minutos</p>
              </Box>
              <Box flex={1} sx={{border: '0.5px solid red', display:'flex', flexDirection: 'row', columnGap: '15px'}}>
                <img src={shareIcon} alt='share'/>
                <p>Compartilhe</p>
              </Box>
              <Box flex={1} sx={{backgroundColor: '#FDE8E9', borderRadius: '35px', border: '0.5px solid black'}}></Box>
            </Box>
          </Box>
        </Box>) : (<CircularProgress sx={{margin: 'auto'}} />)}
      </ContainerPlaylist>
    </Box>
  </Container>)
}

export default Playlist;