import React from 'react';
import Comments from "../Components/Comments"
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
	<Comments/>
    <Contacts/>
	</div>
);
};

export default Feedback;
