import React from 'react'
import Logo from '../../assets/logo.svg'
import { Form} from '@unform/web'

import {FiArrowLeft,FiMail,FiUser, FiLock} from 'react-icons/fi'
import {Container, Content, Background} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
const SignUp:React.FC = () => {


	function handleSubmit(data:object):void{
		console.log(data)
	}
	return <Container>
		<Background/>

		<Content>
			<img src={Logo} alt="logo do gobarber"/>
			<Form onSubmit={handleSubmit} >
				<h1>Faça seu cadastro</h1>
				<Input type="text" icon={FiUser} name='name' placeholder="nome" />
				<Input type="email" icon={FiMail} name='email' placeholder="email" />
				<Input type="password"  icon={FiLock} name='password'  placeholder="senha"/>
				<Button type="submit">Cadastrar</Button>
			</Form>
			<a href="">
			<FiArrowLeft/>
			Voltar
			</a>
		</Content>
	</Container>
}


export default SignUp
