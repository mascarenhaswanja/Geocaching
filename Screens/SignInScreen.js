import React, {useState} from "react";
import { Button, SafeAreaView, Text, View, TextInput} from "react-native";
import { geostyles } from '../utilities/Styles';
import { db } from "../utilities/FirebaseManager"

function SignInScreen({navigation,route}) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const signInPressed = () => {
    setErrorMsg('')
    if (!userEmail) {
      alert('Email is required')
      return;
    }
    if (!userPassword) {
      alert('Password is required')
      return;
    }

    let userSignin = {email: userEmail, password: userPassword};
     
    console.log("Login button pressed") 
    // db.collection("users").get(userSignin).then((querySnapshot) => {
    //   querySnapshot.forEach((documentFromFirestore) => {
    //     console.log(`${documentFromFirestore.id}, ${JSON.stringify(documentFromFirestore.data())}`)
    //   });
    // });

 
    db.collection("users").get(userSignin)
      .then(() => {
          console.log("Document successfully found")
          //if email-password exists go to dashboard
      }).catch((error) => {
          // The document probably doesn't exist.
          console.error('Error - no user-email found', error)
          setErrorMsg(`User doesnt exist - Go to Signup - ${error}`)
          alert(errorMsg)
      })
    }

    const goToSignUp = () => {
        navigation.navigate('HomeTabContainer')
        // navigation.navigate('SignUp')
    }
  
  return (
    <SafeAreaView>
        <Text style={geostyles.title}>Welcome to Geocaching</Text>
        <View>
            <TextInput
                style={geostyles.input}
                onChangeText={(userEmail) =>
                  setUserEmail(userEmail)
                }
                placeholder="Enter Email"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
            />

            <TextInput
                style={geostyles.input}
                onChangeText={(userPassword) =>
                  setUserPassword(userPassword)
                }
                placeholder="Enter Password"  
                placeholderTextColor="#8b9cb5"
                blurOnSubmit={false}
                secureTextEntry={true}
                returnKeyType="next"
              />
 
            <Button title="SignIn" onPress={signInPressed}/>
            <Button title="SignUp" onPress={goToSignUp}/>
        </View>
    </SafeAreaView>
  )
}

export default SignInScreen;