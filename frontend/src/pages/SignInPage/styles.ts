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
          margin-bottom: 2rem !important;
        }

        #desc {
          border-radius: 8px;
          width: 100%;
          border: none;
          background-color: #fff5f5;
          padding: 0.5rem 0.5rem !important;
          box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 2px 0px inset;
          font-size: 1rem;
          margin-bottom: 2rem !important;
          height: 6rem;
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
  height: 100vh;
  width: 65%;

  .notes {
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.25;
  }
`;
