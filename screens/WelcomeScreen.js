import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/Auth-context';

function WelcomeScreen() {
  const [fetchmessage, setfetchmessage] = useState('');
  const AuthCtx= useContext(AuthContext);
  useEffect(()=>{
    axios.get('https://fir-app-6b565-default-rtdb.firebaseio.com/message.json?auth='+AuthCtx.token)
    .then((response)=>{setfetchmessage(response.data)})
  },[])
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchmessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
