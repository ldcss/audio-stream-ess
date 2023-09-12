import { Box, Button, Container, FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidemenu from "../../components/Sidemenu/Sidemenu";
import { ContainerPlaylist } from "./styles";
import { useState } from "react";

function Playlists ():JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  }

  return (
  <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'}}>
      <Navbar />
      <Box style={{display: 'flex', flexDirection: 'row', height: 'calc(100vh - 171px)'}}>
        <Sidemenu />
        <ContainerPlaylist>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <h2>Biblioteca</h2>
            <FormControl >
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </ContainerPlaylist>
      </Box>
  </Container>)
}

export default Playlists;