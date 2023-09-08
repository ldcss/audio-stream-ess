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
          <img
            className='artistPic artist1'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'
          />
          <img
            className='artistPic artist2'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'
          />
          <img
            className='artistPic artist3'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'
          />
          <img
            className='artistPic artist4'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'
          />
          <img
            className='artistPic artist5'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'
          />
          <img
            className='artistPic artist6'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'
          />
          <img
            className='artistPic artist7'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'
          />
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
