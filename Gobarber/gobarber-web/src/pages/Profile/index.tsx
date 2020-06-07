import React, { useCallback, useRef, ChangeEvent } from 'react';
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
	/**
	 * Navigations
	 */
	const history = useHistory();

	/**
	 * Context
	 */
	const { user, updateUser } = useAuth();

	const { addToast } = useToast();

	/**
	 * Refs
	 */
	const formRef = useRef<FormHandles>(null);

	/**
	 * Handles
	 */
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

	const handleAvatarChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			if (e.target.files) {
				const data = new FormData();

				data.append('avatar', e.target.files[0]);

				await api.patch('/users/avatar', data).then((response) => {
					updateUser(response.data);
					addToast({
						type: 'success',

						title: 'Foto atualizada',
					});
				});
			}
		},
		[addToast, updateUser],
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
						<label htmlFor="avatar">
							<FiCamera />
							<input type="file" id="avatar" onChange={handleAvatarChange} />
						</label>
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
