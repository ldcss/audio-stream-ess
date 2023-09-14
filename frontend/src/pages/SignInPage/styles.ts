import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;

  background: rgb(208, 181, 205);
  background: linear-gradient(90deg, rgba(208, 181, 205, 1) 0%, rgba(253, 232, 233, 1) 80%);

  .divisor {
    display: flex;
    flex-direction: row;

    .formHolder {
      margin: auto !important;
      width: 35%;

      .title {
        width: 50%;
        margin: auto !important;
        color: #37294f;
        margin-bottom: 2rem !important;

        @media (max-width: 1400px) {
          margin-top: 0.25rem !important;
          font-size: 1.25rem !important;
          width: 60%;
        }

        @media (max-width: 900px) {
          margin-top: 1rem !important;
          font-size: 1rem !important;
          width: 80%;
        }
      }

      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: center;
        margin: auto !important;
        width: 50%;

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

        #desc_input_field {
          border-radius: 8px;
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

        .submit {
          width: 12rem;
          box-shadow: none;
          font-weight: 600;
          color: white;
          background: #6743a5;
          padding: 1rem !important;
        }
      }
    }
  }
`;

export const ImageHolder = styled.div`
  position: relative;
  top: 0 !important;
  left: 0 !important;
  height: 90vh;
  width: 65%;

  @media (max-width: 900px) {
    display: none;
  }

  .notes {
    top: 0 !important;
    left: 0 !important;
    width: 100%;
    object-fit: cover;
    opacity: 0.25;
  }

  .artistPic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    object-fit: cover;
  }

  .artist1 {
    width: 8rem;
    height: 8rem;
    margin: 9rem 0 0 0 !important;
  }

  .artist2 {
    width: 12rem;
    height: 3rem;
    margin: 3rem 0 0 4rem !important;
  }

  .artist3 {
    width: 8rem;
    height: 8rem;
    margin: 21rem 0 0 4rem !important;
  }

  .artist4 {
    width: 4rem;
    height: 10rem;
    margin: 10rem 0 0 16rem !important;
  }

  .artist5 {
    width: 12rem;
    height: 4rem;
    margin: 32rem 0 0 8rem !important;
  }

  .artist6 {
    width: 8rem;
    height: 4rem;
    margin: 25rem 0 0 22rem !important;
  }

  .artist7 {
    width: 14rem;
    height: 20rem;
    margin: 2rem 0 0 26rem !important;
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

export const ConclusionPopup = styled.div`
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
`;
