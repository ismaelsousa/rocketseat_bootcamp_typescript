import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface AuthState{
	token:string
	user:object
}

interface SignInCredentials{
	email:string
	password:string
}
interface authContext{
	user:object
	signIn(credentials:SignInCredentials): Promise<void>
	signOut():void
}

 const AuthContext = createContext<authContext>({} as authContext)

 const AuthProvider: React.FC = ({children})=>{
	const [data,setData] = useState<AuthState>(()=>{
		
		const token = localStorage.getItem('@GoBarber:token')
		const user = localStorage.getItem('@GoBarber:user')

		if(token && user){
			return {token, user:JSON.parse(user)}
		}

		return {} as AuthState
	})

	const signIn = useCallback(async ({email, password})=>{

		const response = await api.post('sessions', {email, password})

		const {token,user} = response.data


		localStorage.setItem('@GoBarber:token',token)
		localStorage.setItem('@GoBarber:user',JSON.stringify(user))
		setData({token,user})
	},[])

	const signOut = useCallback(()=>{
		localStorage.clear()
		setData({} as AuthState)
	},[])

	return (
		<AuthContext.Provider value={{user:data.user, signIn,signOut}}>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth():authContext{
	const context = useContext(AuthContext)
	if(!context){
		console.log('epa')
		throw new Error('useAuth must be used within an authprovider')
	}
	return context
}

export { AuthProvider, useAuth}
