import React, {useCallback, useRef} from 'react'
import Logo from '../../assets/logo.svg'
import { Form} from '@unform/web'
import { FormHandles} from '@unform/core'
import * as Yup from 'yup'
import {Link, useHistory} from 'react-router-dom'
import getValidationErrors from '../../utils/getValidationErrors'

import api from '../../services/api'


import {FiArrowLeft,FiMail,FiUser, FiLock} from 'react-icons/fi'
import {Container, Content, Background, AnimationContainer} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
import {useToast} from '../../hooks/ToastContext'



const SignUp:React.FC = () => {
	const {addToast} = useToast()
	const history = useHistory()
	const formRef = useRef<FormHandles>(null)

	const handleSubmit = useCallback(async (data:object) =>{
		try {
			formRef.current?.setErrors({})
			const schema = Yup.object().shape({
				name:Yup.string().required('Nome obrigatório'),
				email:Yup.string().required('Email obrigatório').email('Digite um email válido'),
				password:Yup.string().min(6, 'Mínimo 6 dígitos')
			})
			
			await schema.validate(data,{
				abortEarly:false
			})

			await api.post('/users',data)
			addToast({
				type:'success',
				title:'Cadastro realizado!'
			})

			history.push('/')


		} catch (error) {
			
			if(error instanceof Yup.ValidationError){
				const errors = getValidationErrors(error)
				formRef.current?.setErrors(errors)
				return
			}
			addToast({
				title:"Erro ao criar conta",
				type:'error',
			})
		
		}
	},[addToast, history])
	return <Container>
		<Background/>

		<Content>
			<AnimationContainer>
				<img src={Logo} alt="logo do gobarber"/>
				<Form ref={formRef} onSubmit={handleSubmit} >
					<h1>Faça seu cadastro</h1>
					<Input type="text" icon={FiUser} name='name' placeholder="nome" />
					<Input type="email" icon={FiMail} name='email' placeholder="email" />
					<Input type="password"  icon={FiLock} name='password'  placeholder="senha"/>
					<Button type="submit">Cadastrar</Button>
				</Form>
				<Link to="/">
				<FiArrowLeft/>
				Voltar
				</Link>
			</AnimationContainer>
		</Content>
	</Container>
}


export default SignUp
