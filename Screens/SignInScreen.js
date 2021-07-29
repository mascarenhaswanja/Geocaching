import React from "react";
import { Button, SafeAreaView, Text ,View} from "react-native";

function SignInScreen({navigation,route}) {

    const goToHome = () => {
        console.log("Navigating to Home Screen");
        navigation.replace("HomeTabContainer");
        //to not allow user to go back

    }
    const goToSignUp = () => {
        console.log("Navigating to SignUp Screen");
        navigation.navigate("SignUp");
        //maintaining the stack


    }
    return (
        <SafeAreaView>
            <Text >Sign In Screen</Text>
            <View>
                <Button title="SignIn" onPress={goToHome}/>

                <Button title="SignUp" onPress={goToSignUp}/>
            </View>
        </SafeAreaView>
    );
}

export default SignInScreen;