import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
	id: string;
	name: string;
	avatar_url: string;
	email: string;
}
interface AuthState {
	token: string;
	user: User;
}

interface SignInCredentials {
	email: string;
	password: string;
}
interface AuthContext {
	user: User;
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): void;
	updateUser(user: User): void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider: React.FC = ({ children }) => {
	const [data, setData] = useState<AuthState>(() => {
		const token = localStorage.getItem('@GoBarber:token');
		const user = localStorage.getItem('@GoBarber:user');

		if (token && user) {
			api.defaults.headers.authorization = `Bearer ${token}`;

			return { token, user: JSON.parse(user) };
		}

		return {} as AuthState;
	});

	/**
	 * Handlers
	 */

	const signIn = useCallback(async ({ email, password }) => {
		const response = await api.post('sessions', { email, password });

		const { token, user } = response.data;

		localStorage.setItem('@GoBarber:token', token);
		localStorage.setItem('@GoBarber:user', JSON.stringify(user));

		api.defaults.headers.authorization = `Bearer ${token}`;

		setData({ token, user });
	}, []);

	const signOut = useCallback(() => {
		localStorage.clear();
		setData({} as AuthState);
	}, []);

	const updateUser = useCallback(
		(user: User) => {
			setData({
				token: data.token,
				user,
			});
			localStorage.setItem('@GoBarber:user', JSON.stringify(user));
		},
		[setData, data.token],
	);

	return (
		<AuthContext.Provider
			value={{ user: data.user, signIn, signOut, updateUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth(): AuthContext {
	const context = useContext(AuthContext);
	if (!context) {
		console.log('epa');
		throw new Error('useAuth must be used within an authprovider');
	}
	return context;
}

export { AuthProvider, useAuth };
