import { Box, Table, TableCell, Typography,Modal } from '@mui/material';
import styled from 'styled-components'


export const ContainerPlaylist = styled.div`
  padding: 15px !important;
  width: 85%;
  background-color: #BC9EC1;
  display: flex;
  flex-direction: column;
`;

export const ImgDiv = styled.div`
height: 180px;
width: 180px;
background-color: black;

export const
`;


export const BoxLikes = styled(Box)({
  display: 'flex', 
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const TableLikes = styled(Table)({
  backgroundColor: '#1F2232', 
  borderRadius: '8px', 
  mt: 2
})

export const StyledImg = styled.img`
  cursor: pointer;
`;
export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: #BC9EC1;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); 
  border-radius: 8px;
  padding: 16px; 
  overflow: auto;
  border :none !important;
`;


export const StyledTable = styled(Table)`
  background-color: #1F2232;
  border-radius: 8px;
  margin-top: 2rem;
`;
export const StyledTypography = styled(Typography)`
  margin-top: 2rem;
  padding-bottom: 2rem;
`;
export const WhiteTableCell = styled(TableCell)`
  color: white !important;
`;

export const CustomTableCell = styled(TableCell)`
  color: white !important;
`;
export const IndexTableCell = styled(TableCell)`
  width: 40px;
  color: white !important;
  border-bottom: none;
`;

export const NameTableCell = styled(TableCell)`
  color: white !important;
  border-bottom: none;
`;
export const StyledModal = styled(Modal)`

`;






