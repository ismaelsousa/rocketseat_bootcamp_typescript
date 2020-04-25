import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerPros {
	isFocused: boolean;
	isField: boolean;
	isErrored: boolean;
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
	${(props) =>
		props.isErrored &&
		css`
			border-color: #c53030;
		`}

	${(props) =>
		props.isFocused &&
		css`
			color: #ff9000;
			border-color: #ff9000;
		`}
	
	${(props) =>
		props.isField &&
		css`
			color: #ff9000;
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

export const Error = styled(Tooltip)`
	height: 20px;
	margin-left: -16px;
	svg {
		margin: 0;
	}

	span {
		background: #c53030;
		color: #f4ede8;
		&::before {
			border-color: #c53030 transparent;
		}
	}
`;
