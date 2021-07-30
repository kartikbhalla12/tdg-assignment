import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { css } from '@emotion/react';

function Loader(props: { loading: boolean }) {
	const override = css`
		display: block;
		margin: 2rem auto;
		border-radius: 100px;
	`;

	return (
		<BarLoader
			loading={props.loading}
			css={override}
			color={'#fff'}
			height={5}
			width={200}
		/>
	);
}

export default Loader;
