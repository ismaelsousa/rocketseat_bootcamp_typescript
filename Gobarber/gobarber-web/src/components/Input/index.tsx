import React, {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react'
import {IconBaseProps} from 'react-icons'
import {Container} from './styles'
import {useField} from '@unform/core'
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
	name:string
	icon:React.ComponentType<IconBaseProps>;
}
const Input:React.FC<InputProps> = ({name, icon:Icon,...props})=>{
	const [isFocused, setIsFocused] = useState(false)
	const [isField, setIsField] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const {fieldName, defaultValue, error, registerField} = useField(name)

	useEffect(()=>{
		registerField({
			name:fieldName,
			ref:inputRef.current,
			path:'value'
		})
	},[fieldName,registerField])


	const handleInputFocus = useCallback(()=>{
		setIsFocused(true)
	},[])
	
	const handleInputBlur = useCallback(()=>{
		setIsFocused(false)
		setIsField(!!inputRef.current?.value)
	},[])
	return (
		<Container isField={isField} isFocused={isFocused}>
			{Icon && 	<Icon size={20}/>}
			<input 
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				defaultValue={defaultValue} 
				ref={inputRef} 
				{...props}
			 />
		</Container> 
	)
}

export default Input
