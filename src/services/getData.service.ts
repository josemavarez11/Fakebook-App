import axios from 'axios';

export const Carnal = async (url: string) =>{
    try{
      const response = await axios.get(url);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
}