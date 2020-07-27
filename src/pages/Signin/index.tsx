import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const Signin: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImage} alt="GoBarber" />
      <form>
        <h1>Faça o seu logon</h1>

        <input placeholder="E-mail" />

        <input type="password" placeholder="Senha" />

        <button type="submit">Enviar</button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="new">
        <FiLogIn />
        Criar Conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default Signin;
