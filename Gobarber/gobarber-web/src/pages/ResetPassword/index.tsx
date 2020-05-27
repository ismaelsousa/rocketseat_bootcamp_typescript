import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import Logo from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import { useToast } from '../../hooks/ToastContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ResetPasswordFormData {
	password: string;
	password_confirmation: string;
}

const ResetPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { addToast } = useToast();
	const history = useHistory();
	const location = useLocation();

	const handleSubmit = useCallback(
		async (data: ResetPasswordFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					password: Yup.string().required('Senha obrigatória'),
					password_confirmation: Yup.string().oneOf(
						[Yup.ref('password'), null],
						'Senhas não são iguais',
					),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const token = location.search.replace('?token=', '');

				if (!token) {
					throw new Error();
				}

				await api.post('/password/reset', {
					password: data.password,
					password_confirmation: data.password_confirmation,
					token,
				});

				history.push('/');
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					type: 'error',
					title: 'Erro ao resetar senha!',
					description:
						'Ocorreu um erro ao resetar sua senha!, tente novamente!',
				});
			}
		},
		[ResetPassword, addToast, location],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={Logo} alt="logo do gobarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Resetar Senha</h1>

						<Input
							type="password"
							icon={FiLock}
							name="password"
							placeholder="Nova senha"
						/>

						<Input
							type="password"
							icon={FiLock}
							name="password_confirmation"
							placeholder="Confirme senha"
						/>
						<Button type="submit">Alterar senha</Button>
					</Form>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ResetPassword;
