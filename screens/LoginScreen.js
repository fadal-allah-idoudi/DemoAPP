import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Login } from '../util/AUth2';
import { Alert } from 'react-native';
import { AuthContext } from '../store/Auth-context';

function LoginScreen() {
  const [isAuthentication, setisAuthentication] = useState(false);
  const [state, setstate] = useState(true);
  const AuthCtx= useContext(AuthContext);
  async function Loginhundler({email,password}){
      setisAuthentication(true)

      try{
        const token =await  Login(email,password);
        AuthCtx.authenticate(token);}
      catch(error){
        Alert.alert('authenticatoin failed',
          'could not log you in'
        )
        setstate(false)
      }
      setisAuthentication(false)
  }
  if(isAuthentication){
    return <LoadingOverlay message='log in evvde'/>
  }
  return <AuthContent state={state} isLogin onAuthenticate={Loginhundler}/>;
}

export default LoginScreen;
