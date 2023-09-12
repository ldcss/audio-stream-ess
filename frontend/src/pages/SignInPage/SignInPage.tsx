import { ImageHolder, Wrapper } from './styles';
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

const SignInPage = () => {
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
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
            <input type='email' name='email' id='email' />
            <label>Senha</label>
            <input type='password' name='password' id='password' />
            <label>Nome</label>
            <input type='text' name='nome' id='nome' />
            <label>Gênero</label>
            <input type='text' name='genero' id='genero' />
            <label>Descrição</label>
            <textarea name='desc' id='desc' />
            <input type='submit' value='Cadastrar Artista' className='submit' />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignInPage;
