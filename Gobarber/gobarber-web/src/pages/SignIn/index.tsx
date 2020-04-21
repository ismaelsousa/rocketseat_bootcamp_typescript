import React from 'react'
import Logo from '../../assets/logo.svg'

import {FiLogIn} from 'react-icons/fi'
import {Container, Content, Background} from './styles'
const SignIn:React.FC = () => {
	return <Container>
		<Content>
			<img src={Logo} alt="logo do gobarber"/>
			<form >
				<h1>Faça seu logon</h1>
				<input type="email" placeholder="email" />
				<input type="password" placeholder="senha"/>
				<button type="submit">Entrar</button>
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
