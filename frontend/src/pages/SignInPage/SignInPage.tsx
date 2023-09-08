import { ImageHolder, Wrapper } from './styles';
import { Notes } from '../../assets';

const SignInPage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('e is', e);
  };

  return (
    <Wrapper>
      <div className='divisor'>
        <ImageHolder>
          <img src={Notes} alt='' className='notes' />
        </ImageHolder>
        <div className='formHolder'>
          <h2 className='title'>Compartilhe a sua música com o mundo</h2>
          <form onSubmit={handleSubmit}>
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
