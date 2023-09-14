import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from "../../components/Navbar/Navbar"
import Sidemenu from "../../components/Sidemenu/Sidemenu"
import { AlbumService } from '../../services/AlbumService';
import { Album } from '../../types/albumTypes';
import { useForm, SubmitHandler } from "react-hook-form"

import { 
  Container,
  ContainerPlaylist,
  Title,
  TitleAlignLeft,
  Wrapper
} from "./styles"

type Inputs = {
  name: string;
  genre: string;
  description: string;
  released: boolean;
}


export const CreateAlbum = () => {

  const [album, setAlbum] = useState<Album>()

  const navigate = useNavigate()
  const { id } = useParams()

  async function fecthData(id: string){
    try{
      const data = await AlbumService.getAlbumById(id);
      setAlbum(data.data);
    }
    catch{
      alert('Não foi possível carregar dados do album')
      navigate('/albuns')
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { genre, ...res} = data

    if(id){
      AlbumService.updateAlbum({...res, released: true ? res.released === "true": false}, id).then((res)=>{
        console.log(res.code)
        if(res.code == 200){
          alert("Album editado com sucesso")
          navigate('/albuns')
        }
      }).catch((e)=>{
        alert("Não foi possível editar o album");
        console.log(e)
      })
    }else {
      AlbumService.createAlbum({...res, artistId:1}).then((res)=>{
        console.log(res.code)
        if(res.code == 200){
          console.log(res.status)
          alert("Album criado com sucesso")
          navigate('/albuns')
        }
      }).catch(()=>{
        alert("Não foi possível cadastrar o album");
      })
    }
  }

  useEffect(()=>{
    if(id) fecthData(id);
  },[])

  return(
    <Container>
      <Navbar />
      <Wrapper>
        <Sidemenu />
        <ContainerPlaylist>
          <DivFlex>
            <Title>
              {id ? 'Editar Album' : 'Criar Album'}
            </Title>
          </DivFlex>
          <div style={{
            display: 'grid',
          }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(5, 1fr)',
              gridColumnGap: 0,
            }}>
              <div style={{gridArea: '1 / 2 / 2 / 3'}} >
                Nome:
                <Input defaultValue={album?.name} {...register("name", { required: true })} />
                {errors.name && <span style={{gridArea: '2 / 2 / 3 / 3', color:'red'}} >Campo obrigatório</span>}
              </div>
              <div style={{gridArea: '1 / 4 / 2 / 5'}}>
                Descrição:
                <Input defaultValue={album?.description} {...register("description", { required: true })} />
                {errors.description && <span style={{gridArea: '2 / 4 / 3 / 5', color:'red'}} >Campo obrigatório</span>}
              </div>
              <div style={{gridArea: '3 / 2 / 4 / 3'}}>
                Gênero:
                <Input defaultValue={album?.artistId} {...register("genre", { required: true })} />
                {errors.genre && <span style={{gridArea: '4 / 4 / 5 / 5', color:'red'}} >Campo obrigatório</span>}
              </div>
              <div style={{gridArea: '3 / 4 / 4 / 5'}} >
                Lancado ou não?
                <Input type="checkbox" defaultValue={album?.released} {...register("released", { required: true })} />
                {errors.released && <span style={{gridArea: '4 / 2 / 5 / 3', color:'red'}} >Campo obrigatório</span>}
              </div>
              <Input style={{gridArea: '5 / 2 / 6 / 5'}} type="submit" />
            </form>
          </div>
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
const Input = styled.input`
  min-heigth: 20px;
  padding: 4px;
  width: 300px;
  border-radius: 10px;
  margin: 4px;
  background: #202232;
  border:none;
  outline: none;
  color: white;
  font-weight: 700;
  font-size: 24px;
`
