import { Box, Container } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidemenu from "../../components/Sidemenu/Sidemenu";

function Playlist () {

  return (<Container maxWidth={false} sx={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'}}>
    <Navbar />
    <Box style={{display: 'flex', flexDirection: 'row', height: 'calc(100vh - 171px)'}}>
      <Sidemenu />
      <Box style={{width: '85%', backgroundColor: '#BC9EC1'}}>
        <span>Conteudo da playlist</span>
      </Box>
    </Box>
  </Container>)
}

export default Playlist;