import { ImageHolder, Wrapper, ConclusionPopup } from './styles';
import {
  Notes,
  DaftPunk,
  DavidBowie,
  GreenDay,
  JoyDivision,
  KingCrimson,
  Mastodon,
  Olivia,
} from '../../assets';
import axios from 'axios';
import { useState } from 'react';

const SignInPage = () => {
  const [showCompletion, setShowCompletion] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.nome.value,
      genre: e.target.genero.value,
      description: e.target.desc.value,
      type: 1,
    };

    try {
      const response = await axios.post('http://localhost:5001/api/artist', user);
      console.log('API Response:', response.data);
      setSuccess(true);
      setShowCompletion(true);
    } catch (error) {
      console.error('Error:', error);
      setSuccess(false);
      setShowCompletion(true);
    }
  };

  return (
    <>
      {showCompletion && (
        <ConclusionPopup>
          <p id='result'>{success ? 'Sucesso! Artista criado!' : 'Erro! Tente novamente'}</p>
          <button onClick={() => setShowCompletion(false)}>Concluído</button>
        </ConclusionPopup>
      )}
      <Wrapper>
        <div className='divisor'>
          <ImageHolder>
            <img src={Notes} alt='' className='notes' />
            <img className='artistPic artist1' src={DaftPunk} />
            <img className='artistPic artist2' src={Mastodon} />
            <img className='artistPic artist3' src={DavidBowie} />
            <img className='artistPic artist4' src={GreenDay} />
            <img className='artistPic artist5' src={KingCrimson} />
            <img className='artistPic artist6' src={JoyDivision} />
            <img className='artistPic artist7' src={Olivia} />
          </ImageHolder>
          <div className='formHolder'>
            <h2 className='title'>Compartilhe a sua música com o mundo</h2>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input type='email' name='email' id='email_input_field' />
              <label>Senha</label>
              <input type='password' name='password' id='password_input_field' />
              <label>Nome</label>
              <input type='text' name='nome' id='nome_input_field' />
              <label>Gênero</label>
              <input type='text' name='genero' id='genero_input_field' />
              <label>Descrição</label>
              <textarea name='desc' id='desc_input_field' />
              <input type='submit' value='Cadastrar Artista' className='submit' id='submit' />
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SignInPage;
