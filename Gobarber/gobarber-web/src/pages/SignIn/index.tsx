import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {FiLogIn,FiMail, FiLock} from 'react-icons/fi'
import getValidationErrors from '../../utils/getValidationErrors'
import Logo from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { signIn } = useAuth();
	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: SignInFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um email válido'),
					password: Yup.string().required('Senha obrigatória'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});
				await signIn({
					email: data.email,
					password: data.password,
				});
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					title: 'Autenticação',
					type: 'error',
					description: 'Erro no login',
				});
			}
		},
		[signIn, addToast],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={Logo} alt="logo do gobarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu logon</h1>
						<Input
							type="email"
							icon={FiMail}
							name="email"
							placeholder="email"
						/>
						<Input
							type="password"
							icon={FiLock}
							name="password"
							placeholder="senha"
						/>
						<Button type="submit">Entrar</Button>
						<a href="fogot">Esqueci minha senha!</a>
					</Form>
					<Link to="/signup">
						<FiLogIn />
						Criar conta
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
</Container>
)
	);
};

export default SignIn;
