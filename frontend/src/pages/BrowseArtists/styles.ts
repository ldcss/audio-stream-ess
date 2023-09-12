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

export const EditPopup = styled.div`
  position: fixed;
  top: 25% !important;
  left: 39.5% !important;

  z-index: 1000 !important;
  margin: auto !important;
  width: 20rem;
  height: 23rem;

  background: #b5a8ca;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin: auto !important;
    width: 70%;
    margin-top: 2rem !important;

    label {
      align-self: flex-start;
      font-size: 0.75rem;
      color: #37294f;
      font-weight: 600;
    }

    input {
      border-radius: 8px;
      width: 100%;
      border: none;
      background-color: #fff5f5;
      padding: 0.5rem 0.5rem !important;
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 2px 0px inset;
      font-size: 1rem;
      margin-bottom: 1.25rem !important;
    }

    #desc {
      border-radius: 8px 8px;
      width: 100%;
      border: none;
      background-color: #fff5f5;
      padding: 0.5rem 0.5rem !important;
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 2px 0px inset;
      font-size: 1rem;
      color: #37294f;
      margin-bottom: 2rem !important;
      height: 4rem;
      resize: none;
    }

    textarea::-webkit-scrollbar {
      width: 0.3rem !important;
      background-color: #fff5f5;
      border-radius: 0 2rem 2rem 0;
    }

    textarea::-webkit-scrollbar-track {
      //-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    textarea::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      .submit {
        width: 5rem;
        box-shadow: none;
        font-weight: 600;
        color: white;
        background: #6743a5;
        padding: 0.5rem !important;
        height: 2rem !important;
        font-family: 'Helvetica';
        font-size: 1rem !important;
        border: 1.5px solid #6743a5;
      }
      button {
        width: 5rem;
        box-shadow: none;
        font-weight: 600;
        color: #6743a5;
        background: white;
        border: 1.5px solid #6743a5;
        padding: 0.4rem 0.3rem !important;
        height: 2rem !important;
        text-align: center;
        font-family: 'Helvetica';
        font-size: 1rem !important;
      }
    }
  }
`;

export const DeletePopup = styled.div`
  position: fixed;
  top: 40% !important;
  left: 39.5% !important;

  z-index: 1000 !important;
  width: 20rem;
  height: 8rem;

  margin: auto !important;
  padding: 1rem !important;

  background: #b5a8ca;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;

  display: flex;
  flex-direction: column;

  p {
    font-weight: 600;
    color: #3c3c3c;
    width: 80%;
    align-self: center;
    margin: auto !important;
    margin-top: 0.5rem !important;
  }

  .buttons {
    margin: auto !important;
    margin-top: 1rem !important;
    display: flex;
    flex-direction: row;
    gap: 1rem;

    button {
      width: 5rem;
      box-shadow: none;
      font-weight: 600;
      color: #6743a5;
      background: white;
      border: 1.5px solid #6743a5;
      padding: 0.4rem 0.3rem !important;
      height: 2rem !important;
      text-align: center;
      font-family: 'Helvetica';
      font-size: 1rem !important;
    }

    .delete {
      color: white;
      background: #6743a5;
    }
  }
`;
