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

        #desc {
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
