<<<<<<< HEAD
import React, {useState} from "react";
import { Button, SafeAreaView, Text, View, TextInput} from "react-native";
import { geostyles } from '../utilities/Styles';
import { db } from "../utilities/FirebaseManager"
=======
import React, {useState} from "react"
import { Button, SafeAreaView, Text, View, TextInput} from "react-native"
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
>>>>>>> 32d492e (SignIn style)

function SignInScreen({navigation,route}) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const signInPressed = () => {
    setErrorMsg('')
    if (!userEmail || !userPassword) {
      setErrorMsg('Please enter a Email/Password')
      alert(errorMsg)
      return;
    }

    let isValid = false
  
      //db.collection('users').where('email', '==', userEmail).get()
      //.where('password', '==', userSignIn.password).get()
      //db.collection('users').doc(userEmail).get()
      db.collection('users').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentFromFirestore) => {
         //console.log(`${documentFromFirestore.id}, ${JSON.stringify(documentFromFirestore.data())}`)
          if (userEmail === documentFromFirestore.data().email &&
              userPassword === documentFromFirestore.data().password) {
                console.log(`Exists ${JSON.stringify(documentFromFirestore.data())}`)
                isValid = true
          }
        })
      })
      .then(() => {
        if (isValid) {
          // go to Dashboard
          console.log(`GO to Dashboard`)
          //navigation.navigate('Dashboard')
        } else {
          setErrorMsg(`User doesnt exist - Go to Signup`)
          alert(errorMsg)
        }
      })
      .catch((error) => {
         console.error('Error getting document - no user-email found', error)
         setErrorMsg(`User doesnt exist - Go to Signup - ${error}`)
         alert(errorMsg)
     })

     if (isValid === true) {
       // go to Dashboard
       console.log(`GO to Dashboard`)
       //navigation.navigate('Dashboard')
     } else {
      setErrorMsg(`User doesnt exist - Go to Signup`)
      alert(errorMsg)
     }
 
    }

    const goToSignUp = () => {
<<<<<<< HEAD
        navigation.navigate('HomeTabContainer')
=======
      console.log(`GO to Dashboard`)
      //  navigation.navigate('SignUpScreen')
>>>>>>> 32d492e (SignIn style)
    }
  
  return (
    <SafeAreaView style={geostyles.container}>
        <Text style={geostyles.title}>Welcome to Geocaching</Text>
        <View >
            <TextInput
                style={geostyles.input}
                placeholder=" Enter Email"  
                placeholderTextColor="#243b16"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(userEmail) =>
                  setUserEmail(userEmail)
                }
                value={userEmail}
            />

            <TextInput
                style={geostyles.input}
                placeholder=" Enter Password "  
                placeholderTextColor="#243b16"
                blurOnSubmit={false}
                secureTextEntry={true}
                returnKeyType="next"
                onChangeText={(userPassword) =>
                  setUserPassword(userPassword)
                }
                value={userPassword}
              />
 
            <Button title="SignIn" onPress={signInPressed}/>
            <Button title="SignUp" onPress={goToSignUp}/>
        </View>
    </SafeAreaView>
  )
}

export default SignInScreen;