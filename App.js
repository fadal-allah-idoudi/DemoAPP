import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/Auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const AuthCtx= useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight:({tintColor})=><IconButton icon="exit" color={tintColor} size={24} onPress={AuthCtx.LogOut}/>
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const AuthCtx= useContext(AuthContext);
  return (
      <NavigationContainer>
        {!AuthCtx.isAuthticated &&<AuthStack />}
        {AuthCtx.isAuthticated && <AuthenticatedStack/>}
      </NavigationContainer>
   
  );
}

export default function App() {
  const [istryinglog, setistryinglog] = useState(true); 
  const AuthCtx= useContext(AuthContext);
  useEffect(()=>{
    async function fetchtoken(){
     const storedToken= await AsyncStorage.getItem('token')
     if(storedToken){
      AuthCtx.authenticate(storedToken)
     }
     setistryinglog(false)
    }
    fetchtoken();
},[])
if(istryinglog){
  <AppLoading/>
}
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}