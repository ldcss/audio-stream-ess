import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  background: #bc9ec1;

  h3 {
    margin-top: -6rem !important;
    font-size: 2rem;
    color: #37294f;
    width: 15%;
  }

  .MuiPaper-elevation1 {
    width: 20%;

    border: none;
    border-radius: 1rem;
    background: #fff5f5;
    padding: 1rem 0 0 1rem !important;

    font-weight: 600;
    color: #37294f;

    .MuiSvgIcon-root {
      display: none;
    }
  }

  ::placeholder {
    color: #37294f;
  }

  .tableContainer {
    width: 80%;
    height: 45%;

    padding: 1rem !important;
    background: #baa7dc;
    color: #37294f;

    .table {
      font-weight: 800 !important;
      border-collapse: separate;
      border-spacing: 0px 0.5rem;

      .head {
        padding: 20rem 1rem !important;
        background: #fde8e9;

        .headRow {
          padding: 20rem 1rem !important;
        }
      }

      .body {
        .bodyRow {
          border-radius: 2rem !important;
          background: #fff5f5;
          height: 2rem;
        }
      }
    }

    .settings {
      font-size: 1.25rem;
      margin-left: 0.25rem;
      color: #37294f;
    }
  }
`;
