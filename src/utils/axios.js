const axios = require('axios');
const getRequest = async(url)=> {
    console.log(url)
    try{
        const response = await axios.get(`${url}`);
        return response
    }
    catch(err){
        console.log(err) 
    }
}
module.exports = {
    getRequest
}