import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden !important;
  width: 100vw;
  height: 100vh;
  margin: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  background: rgb(208, 181, 205);
  background: linear-gradient(90deg, rgba(188, 161, 205, 1) 0%, rgba(253, 232, 233, 1) 80%);

  h3 {
    margin-top: -8rem !important;
    font-size: 2rem;
    color: #37294f;
    width: 15%;
    z-index: 2;
    text-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  }

  h5 {
    margin-top: -2rem !important;
    font-size: 1rem;
    color: #37294f;
    font-weight: 400;
    padding-bottom: 2rem;
    z-index: 2;
    text-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  }

  .blob {
    position: absolute;
    z-index: 1;
    margin-left: 70rem !important;
    margin-bottom: 20rem !important;
  }

  .notes {
    position: absolute;
    top: 0 !important;
    left: 0 !important;
    width: 45%;
    object-fit: cover;
    opacity: 0.15;
    overflow: hidden !important;
  }
`;

export const DirectionCard = styled.div`
  width: 13rem;
  height: 13rem;
  background: #f5ffff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  border-radius: 1rem;

  color: #37294f;
  padding: 0.5rem;
  z-index: 5 !important;

  p {
    font-size: 1rem;
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 2rem;
  z-index: 5 !important;
`;
