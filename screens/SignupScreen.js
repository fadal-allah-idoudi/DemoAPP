import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';

import LoadingOverlay from '../components/ui/LoadingOverlay';

import { createUser2 } from '../util/AUth2';
import { Alert } from 'react-native';
import { AuthContext } from '../store/Auth-context';

function SignupScreen() {
  const [state, setstate] = useState(true);
  const [isAuthentication, setisAuthentication] = useState(false);
  const AuthCtx= useContext(AuthContext);
  async function signuphundler({email,password}){
    
    try
   {
    setisAuthentication(true)
    const token =await  createUser2(email,password);
    AuthCtx.authenticate(token);
  }
   catch(error){
    Alert.alert('authenticatoin failed',
      'could not log you in'
    )
    
    setstate(false)
    
  }
   setisAuthentication(false)
  }
  if(isAuthentication){
    return <LoadingOverlay message='dbbbbbb'/>
  }
  return <AuthContent state={state} onAuthenticate={signuphundler} />;
}

export default SignupScreen;
