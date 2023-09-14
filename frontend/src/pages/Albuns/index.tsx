import {
  Grid,
  ScopedCssBaseline,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from "../../components/Navbar/Navbar"
import Sidemenu from "../../components/Sidemenu/Sidemenu"
import { AlbumService } from '../../services/AlbumService';
import { Album } from '../../types/albumTypes';
import { 
  BoxPlaylist,
  Container,
  ContainerPlaylist,
  ImgPlaylistDiv,
  Title,
  TitleAlignLeft,
  Wrapper
} from "./styles"

export const ViewAlbuns = () => {

  const [playlists, setPlaylists] = useState<Album[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    AlbumService.getAlbuns().then((response) => {
      setPlaylists(response.data);
    }).catch((e) => alert(`error:${e} when load playlists`));
  },[]);

  const AllPlaylists = playlists.map(playlist => {
    return (
    <Link to={`/`}>
      <ScopedCssBaseline>
      <BoxPlaylist>
        <ImgPlaylistDiv />
        <Typography>{playlist.name}</Typography>
      </BoxPlaylist>
      </ScopedCssBaseline>
    </Link>
    )
  })

  return(
    <Container>
      <Navbar />
      <Wrapper>
        <Sidemenu />
        <ContainerPlaylist>
          <DivFlex>
            <Title>Albuns</Title>
            <TitleAlignLeft> 
              <ButtonPlus onClick={()=>navigate('/criarAlbum')} >
              + Criar Album
              </ButtonPlus>
            </TitleAlignLeft>
          </DivFlex>
          <Grid display={'flex'} flexDirection={'row'} flexWrap={'wrap'} item lg={4} md={4} mt={'20px'} gap={'35px'}>
            {AllPlaylists}
          </Grid>
        </ContainerPlaylist>
      </Wrapper>
    </Container>
  )
}

const DivFlex = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
`
const ButtonPlus = styled.div`
  background-color: #202232;
  padding: 4px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
`
