import axios from  '../lib/AjaxRequest';

// console.log(axios.request({url:'/test'}))

export const getTest = ()=>axios.request({url:'/test'});
export const login = username =>axios.request({url:'/login',method:'POST',data:{username}});

export default {}