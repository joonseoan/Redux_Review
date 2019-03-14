import axios from 'axios';

// setup baseURL !! use this field name.
export default axios.create({

    baseURL: 'http://jsonplaceholder.typicode.com'
       
});