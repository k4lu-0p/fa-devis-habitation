import axios from 'axios';

const verify = async (token) => {
	const googleSecretToken = process.env.RECAPTCHA_KEY_SERVER;

	if (!token) return false;

	const {
		data: response
	} = await axios({
		method: 'post',
		url: 'https://www.google.com/recaptcha/api/siteverify',
		params: {
			secret: googleSecretToken,
			response: token,
		}
	});

	return response.success;
}

export default {
	verify,
}