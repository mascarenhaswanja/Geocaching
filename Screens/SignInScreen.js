import React, {useState} from "react"
import { Button, SafeAreaView, Text, View, TextInput} from "react-native"
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
import AsyncStorage from '@react-native-async-storage/async-storage'

function SignInScreen({navigation,route}) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const signInPressed = () => {
    // setErrorMsg('')
    let isValid = false
  
    // INPUT VALIDATION
    // if (!userEmail || !userPassword) {
    //   setErrorMsg('Please enter a Email/Password')
    //   alert(errorMsg)
    //   return;
    // }  

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
          console.log(`Go to Home`)
          saveEmail()
          navigation.navigate('HomeTabContainer')
        } else {
          setErrorMsg(`User doesnt exist - Go to Signup`)
          alert(errorMsg)
          setUserEmail('')
          setUserPassword('')
        }
      })
      .catch((error) => {
         console.error('Error getting document - no user-email found', error)
         setErrorMsg(`User doesnt exist - Go to Signup - ${error}`)
         alert(errorMsg)
     })
    }
  
    const saveEmail = () => {
      AsyncStorage.setItem("email", userEmail)
        .then(
          () => {
            console.log(`SIGNIN: Save Email was successfully ${userEmail}`)
          }
        )
        .catch(
          (error) => {
            console.log(`Error save Email ${error}`)
          }
        )
    }

    const goToSignUp = () => {
      navigation.navigate('SignUp')
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
              />
            <Button title="SignIn" onPress={signInPressed}/>
            <Button title="Don't have account? SignUp" onPress={goToSignUp}/>
        </View>
    </SafeAreaView>
  )
}

export default SignInScreen;