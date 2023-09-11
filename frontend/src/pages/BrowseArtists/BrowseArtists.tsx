import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { PlaylistLikesDetail } from '../../types/playlistTypes';
import { PlaylistService } from '../../services/PlaylistService';


type Playlist = {
  id: number;
  name: string;
  genre: string;
  description: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  
};


const BrowseArtists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [likedPlaylists, setLikedPlaylists] = useState<number[]>([]);
  const [likesDetails, setLikesDetails] = useState<{ [key: number]: PlaylistLikesDetail }>({});
  const [likesCount, setLikesCount] = useState(0);
  const fetchPlaylists = async () => {
    try {
      const response = await api.get('/playlist')
      setPlaylists(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar playlists:", error);
    }
  }

  const fetchLikesDetails = async (playlistId: number) => {
    try {
      const response = await api.get(`playlist/${playlistId}/likes`);
      console.log(`Fetched likes details for playlist ${playlistId}:`, response.data);
  
      setLikesDetails(prevDetails => ({ ...prevDetails, [playlistId]: response.data.data }));
    } catch (error) {
      console.error("Erro ao buscar detalhes dos likes:", error);
    }
  };
  

  


 
  useEffect(() => {
    fetchPlaylists();
  
  }, []);

  const userId = 2; 
  

  const handleLikeClick = async (playlistId: any) => {
      try {
          const response = await api.post(`playlist/${playlistId}/likes/${userId}`);
  
          if (response.status === 200) {
              alert('Curtida adicionada com sucesso!');
              setLikesCount(prevCount => prevCount + 1);
              setLikedPlaylists(prevLiked => [...prevLiked, playlistId]); 
              await fetchPlaylists();
          } else {
              alert('Erro ao curtir!');
          }
      } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
      }
  };
  
  const handleUnlikeClick = async (playlistId: any) => {
      try {
          const response = await api.delete(`playlist/${playlistId}/likes/${userId}`);
  
          if (response.status === 200) {
              alert('Curtida removida com sucesso!');
              setLikesCount(prevCount => prevCount - 1);
              setLikedPlaylists(prevLiked => prevLiked.filter(id => id !== playlistId));
              await fetchPlaylists();
          } else {
              alert('Erro ao remover a curtida!');
          }
      } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
      }
  };
  


  return (
    <>
      <div>
        <h1>Teste2</h1>
        <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>
            {playlist.name}

            {likedPlaylists.includes(playlist.id) 
              ? <button onClick={() => handleUnlikeClick(playlist.id)}>Descurtir</button>
              : <button onClick={() => handleLikeClick(playlist.id)}>Curtir</button>
            }

            <button onClick={() => fetchLikesDetails(playlist.id)}>Mostrar quem curtiu</button>

            {likesDetails[playlist.id] && (
                <div>
                  <p>Likes count: {likesDetails[playlist.id].count}</p>
                  <ul>
                    {likesDetails[playlist.id].users.map(user => <li key={user.id}>{user.name}</li>)}
                  </ul>
                </div>
              )}

              <span>{likesCount} curtidas</span>
            </li>
          ))}


          </ul>
        </div>
      </>
    );
};

export default BrowseArtists;
