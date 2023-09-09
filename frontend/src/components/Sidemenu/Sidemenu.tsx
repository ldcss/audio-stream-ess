import { Box } from "@mui/material";
import { Playlist } from "../../types/playlistTypes";
import { useEffect, useState } from "react";
import { PlaylistService } from "../../services/PlaylistService";

function Sidemenu() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    async function getAllPlaylists(id: number){
      PlaylistService.getPlaylistsFromUser(id).then(response => {
        setPlaylists(response.data);
        console.log('deu certo!', response);
      }).catch(err => console.log('err', err));
    }
    getAllPlaylists(1);
  }, [])

  return(<Box style={{width: '15%', backgroundColor: '#1F2232'}}>
      {playlists.map(playlist => <span>{playlist.name}</span>)}
</Box>)
}

export default Sidemenu;