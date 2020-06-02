import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
	> header {
		height: 144px;
		background: #28262e;

		display: flex;
		align-items: center;

		div {
			padding-left: 30px;
			width: 100%;
			max-width: 1120px;
			margin: 0 auto;

			svg {
				color: #999591;
				width: 25px;
				height: 25px;
			}
		}
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: -176px auto 0;

	width: 100%;

	form {
		margin: 80px 0;
		width: 340px;
		text-align: center;
		display: flex;
		flex-direction: column;

		h1 {
			margin-bottom: 24px;
			font-size: 20px;
			text-align: left;
		}

		a {
			color: #f4ede8;
			display: block;
			margin-top: 24px;
			text-decoration: none;
			transition: color 2s;
			&:hover {
				color: ${shade(0.2, '#f4ede8')};
			}
		}

		input[name='old_password'] {
			margin-top: 24px;
		}
	}
`;

export const AvatarInput = styled.div`
	margin-bottom: 32px;
	position: relative;
	width: 186px;

	align-self: center;
	img {
		width: 186px;
		height: 186px;
		border-radius: 50%;
	}

	button {
		border: none;
		position: absolute;
		border-radius: 50%;
		width: 48px;
		height: 48px;
		background: #ff9000;
		right: 0;
		bottom: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			width: 20px;
			height: 20px;
			color: #312e38;
		}

		&:hover {
			background: ${shade(0.2, '#ff9000')};
		}
	}
`;
