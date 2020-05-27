import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import Logo from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import { useToast } from '../../hooks/ToastContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ForgotPasswordFormData {
	email: string;
	password: string;
}

const ForgotPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const formRef = useRef<FormHandles>(null);

	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: ForgotPasswordFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um email válido'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				setLoading(true);

				await api.post('/password/forgot', {
					email: data.email,
				});

				addToast({
					type: 'success',
					title: 'Email de recuperação enviado!',
					description:
						'Enviamos um email para confirmar a recuperação de senha',
				});
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					type: 'error',
					title: 'Erro na recuperação de senha',
					description: 'Erro ao tentar realizar a recuperação de senha',
				});
			} finally {
				setLoading(false);
			}
		},
		[ForgotPassword, addToast],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={Logo} alt="logo do gobarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Recuperar Senha</h1>
						<Input
							type="email"
							icon={FiMail}
							name="email"
							placeholder="email"
						/>

						<Button loading={loading} type="submit">
							Recuperar
						</Button>
					</Form>
					<Link to="/">
						<FiLogIn />
						Voltar ao Login
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ForgotPassword;
