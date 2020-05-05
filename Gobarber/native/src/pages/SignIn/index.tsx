import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logo} />
      <Title>Faça seu logon</Title>
      <Icon name="mail" />
      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
