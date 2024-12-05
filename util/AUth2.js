import axios from 'axios';

const API_KEY = 'AIzaSyCEnEkc7qsCjlvVgLAU8FSAu1SjgdmWSxo';
export async function Authentication(mode,email,password){
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
   const response  = await axios.post(url,{
        email: email,
        password: password,
        returnSecureToken: true
      })
    const token =response.data.idToken ;
    return token
  }
  export async function createUser2(email, password) {
    const token =await Authentication('signUp',email,password)
    return token

}
export async function Login(email, password) {
  const token =await Authentication('signInWithPassword',email,password)
  return token
} 
