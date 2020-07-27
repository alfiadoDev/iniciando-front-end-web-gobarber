import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImage from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Signup: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImage} alt="GoBarber" />
        <Form onSubmit={handleSubmit}>
          <h1>Faça o seu cadastro</h1>

          <Input name="name" placeholder="Nome" icon={FiUser} />

          <Input name="email" placeholder="E-mail" icon={FiMail} />

          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="new">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default Signup;
