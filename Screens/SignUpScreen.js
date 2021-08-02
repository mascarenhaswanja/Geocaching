import React,{useState} from "react";
import { Button, SafeAreaView,TextInput ,Text ,View} from "react-native";
import { db } from "../utilities/FirebaseManager"


function SignUpScreen({navigation,route}) {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userName, setUserName] = useState('')
    const [result, setResult] = useState('');

    const addUserToFirebase = (user) => {
        db.collection("users").add(user)
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              setResult(`Successfully added to Fav List`)
              navigation.navigate("SignIn");

          })
          .catch((error) => {
              console.error("Error adding document: ", error);
              setResult("Error while adding to Fav List!");
          });

    }
    const goToSignUp = () => {
        const User = {
            email : userEmail,
            password : userPassword,
            phone : userPhone,
            name : userName
        }
        addUserToFirebase(User);
    }
    return (
        <SafeAreaView>
             <TextInput
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
                onChangeText={(userPassword) =>
                  setUserPassword(userPassword)
                }
                placeholder="Enter Password"  
                placeholderTextColor="#8b9cb5"
                blurOnSubmit={false}
                secureTextEntry={true}
                returnKeyType="next"
              />      

            <TextInput
                onChangeText={(phone) =>
                    setUserPhone(phone)
                }
                placeholder="Enter phone"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
            />  
            <TextInput
                onChangeText={(userName) =>
                  setUserName(userName)
                }
                placeholder="Enter name"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
            />    


                <Button title="SignUp" onPress={goToSignUp}/>
                <Text>{result}</Text>
        </SafeAreaView>
    );
}

export default SignUpScreen;