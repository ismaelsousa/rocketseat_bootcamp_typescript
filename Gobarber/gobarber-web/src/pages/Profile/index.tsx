import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { Container, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/ToastContext';
import { useAuth } from '../../hooks/AuthContext';

const Profile: React.FC = () => {
	const { addToast } = useToast();
	const history = useHistory();
	const formRef = useRef<FormHandles>(null);

	const { user } = useAuth();

	const handleSubmit = useCallback(
		async (data: object) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um email válido'),
					password: Yup.string().min(6, 'Mínimo 6 dígitos'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await api.post('/users', data);
				addToast({
					type: 'success',
					title: 'Cadastro realizado!',
				});

				history.push('/');
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errors = getValidationErrors(error);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					title: 'Erro ao criar conta',
					type: 'error',
				});
			}
		},
		[addToast, history],
	);
	return (
		<Container>
			<header>
				<div>
					<Link to="/dashboard">
						<FiArrowLeft />
					</Link>
				</div>
			</header>
			<Content>
				<Form
					ref={formRef}
					initialData={{ name: user.name, email: user.email }}
					onSubmit={handleSubmit}
				>
					<AvatarInput>
						<img src={user.avatar_url} alt={user.name} />
						<button type="button">
							<FiCamera />
						</button>
					</AvatarInput>
					<h1>Meu perfil</h1>

					<Input type="text" icon={FiUser} name="name" placeholder="nome" />
					<Input type="email" icon={FiMail} name="email" placeholder="email" />
					<Input
						containerStyle={{ marginTop: 24 }}
						type="old+password"
						icon={FiLock}
						name="password"
						placeholder="Senha Atual"
					/>
					<Input
						type="password"
						icon={FiLock}
						name="password"
						placeholder="Nova senha"
					/>
					<Input
						type="password_confirmation"
						icon={FiLock}
						name="password"
						placeholder="Confirmar senha"
					/>
					<Button type="submit">Confirmar mudanças</Button>
				</Form>
			</Content>
		</Container>
	);
};

export default Profile;
