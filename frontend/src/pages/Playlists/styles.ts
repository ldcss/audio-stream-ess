import { Box, FormControl } from '@mui/material';
import styled from 'styled-components'

export const ContainerPlaylist = styled.div`
  padding: 25px;
  width: 85%;
  background-color: #BC9EC1;
  display: flex;
  flex-direction: column;
`;

export const DividerFilter = styled.div`
  margin-top: 10px;
  border: 1px solid #1F2232;
  border-radius: 5px;
`;

export const Container = styled('div')({
  display: 'flex', 
  flexDirection: 'column', 
  minHeight: '100vh', 
  height: '100%', 
  width: '100vw', 
  padding: '0px !important'
})

export const Wrapper = styled(Box)({
  display: 'flex', 
  flexDirection: 'row', 
  height: '100%', 
  minHeight: '100vh', 
  paddingBottom: '90px'
})

export const FlexRowSelects = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  columnGap: '50px',
  justifyContent: 'flex-end'
})

export const Title = styled('h2')({
  marginRight: 'auto', 
  marginLeft: '20px'
});

export const FormControlFilter = styled(FormControl)({
  width: '200px',
  height: '60%',
})

export const BoxPlaylist = styled(Box)({
  height: '200px', 
  width: '160px', 
  backgroundColor: '#BC9EC1'
})

export const ImgPlaylistDiv = styled(Box)({
  height: '160px', 
  width: '160px', 
  backgroundColor: '#1F2232', 
  borderRadius: '35px'
})