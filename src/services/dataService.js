import axios from 'axios';

const url = '/rules.txt';

const getData = async ()=>{
	const result = await axios.get(url)
	return (result.data);
}

const service = {
	getData
}

export default service;