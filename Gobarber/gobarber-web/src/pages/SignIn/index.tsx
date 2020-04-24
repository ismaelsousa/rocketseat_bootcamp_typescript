import React,{useRef, useCallback} from 'react'
import Logo from '../../assets/logo.svg'
import {Form} from '@unform/web'
import {FormHandles} from "@unform/core"
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import {FiLogIn,FiMail, FiLock} from 'react-icons/fi'
import {Container, Content, Background} from './styles'
import {useAuth} from '../../hooks/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Button'


interface SignInFormData{
	email:string
	password:string
}
const SignIn:React.FC = () => {

	const formRef = useRef<FormHandles>(null)
	
	const {signIn} = useAuth()

	const handleSubmit = useCallback(async (data:SignInFormData) =>{
		try {
			formRef.current?.setErrors({})
			const schema = Yup.object().shape({
				email:Yup.string().required('Email obrigatório').email('Digite um email válido'),
				password:Yup.string().required('Senha obrigatória')
			})
			
			await schema.validate(data,{
				abortEarly:false
			})
			signIn({
				email:data.email,
				password:data.password,
			})
		} catch (error) {
			
			const errors = getValidationErrors(error)
			formRef.current?.setErrors(errors)
			
		}
	},[signIn])

	return <Container>
		<Content>
			<img src={Logo} alt="logo do gobarber"/>
			<Form ref={formRef} onSubmit={handleSubmit} >
				<h1>Faça seu logon</h1>
				<Input type="email" icon={FiMail} name='email' placeholder="email" />
				<Input type="password"  icon={FiLock} name='password'  placeholder="senha"/>
				<Button type="submit">Entrar</Button>
				<a href="fogot">Esqueci minha senha!</a>
			</Form>
			<a href="">
			<FiLogIn/>
			Criar conta
			</a>
		</Content>
		<Background/>
	</Container>
}


export default SignIn
