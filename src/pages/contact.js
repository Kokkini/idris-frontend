import React from 'react';
import Contacts from "../Components/Contacts"

const Feedback = () => {
return (
	<div
	style={{
		display: 'flex',
		justifyContent: 'Right',
		alignItems: 'Right',
		height: '100vh'
	}}
	>
	<Contacts/>
	</div>
);
};

export default Feedback;
