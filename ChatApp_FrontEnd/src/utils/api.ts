import axios from 'axios'

const getContents = async () => {
  try {
    const res = await axios.get('http://localhost:');
    return res.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default getContents