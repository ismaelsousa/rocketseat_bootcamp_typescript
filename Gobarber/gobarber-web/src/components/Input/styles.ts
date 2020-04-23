import styled, {css} from 'styled-components';

interface ContainerPros{
	isFocused:boolean
	isField:boolean
}
export const Container = styled.div<ContainerPros>`

	background:#232129;
	border-radius:10px;
	border: 2px solid #232129;
	padding:16px;
	width:100%;
	color:#f4ede8;

	display:flex;
	align-items:center;

	& + div{
				margin-top:8px;
	}

	${props => props.isFocused && css`
		color:#ff9000;
		border-color:#ff9000;
	`}
	
	${props => props.isField && css`
		color:#ff9000;
	`}

	input{
		flex:1;
		border:0;
		background:transparent;
		color:#f4ede8;
		}

		svg{
			margin-right:16px;
		}
`;
