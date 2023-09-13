import { ImageHolder, Wrapper } from './styles';


const LoginPage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('e is', e);
  };

  return (
    <Wrapper>
      <div className='divisor'>
        <div className='formHolder'>
          <h2 className='title'>Faça seu login para acessar a plataforma</h2>
          <form onSubmit={handleSubmit}>
            <select>
              <option value='' selected disabled>Selecione o tipo da sua conta</option>
              <option value='artista'>Artista</option>
              <option value='Moderador'>Moderador</option>
            </select>
            <label>Nome</label>
            <input type='text' name='nome' id='nome' />
            <label>Senha</label>
            <input type='text' name='senha' id='senha' />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
