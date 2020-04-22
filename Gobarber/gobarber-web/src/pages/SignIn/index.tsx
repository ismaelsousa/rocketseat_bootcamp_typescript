import React from 'react'
import Logo from '../../assets/logo.svg'

import {FiLogIn,FiMail, FiLock} from 'react-icons/fi'
import {Container, Content, Background} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
const SignIn:React.FC = () => {
	return <Container>
		<Content>
			<img src={Logo} alt="logo do gobarber"/>
			<form >
				<h1>Faça seu logon</h1>
				<Input type="email" icon={FiMail} name='email' placeholder="email" />
				<Input type="password"  icon={FiLock} name='password'  placeholder="senha"/>
				<Button type="submit">Entrar</Button>
				<a href="fogot">Esqueci minha senha!</a>
			</form>
			<a href="">
			<FiLogIn/>
			Criar conta
			</a>
		</Content>
		<Background/>
	</Container>
}


export default SignIn
