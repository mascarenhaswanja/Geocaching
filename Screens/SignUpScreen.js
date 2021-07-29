import React from "react";
import { Button, SafeAreaView, Text ,View} from "react-native";

function SignUpScreen({navigation,route}) {

    const goToSignUp = () => {
        console.log("Navigating to SignUp Screen");
        navigation.navigate("SignUp");
    }
    return (
        <SafeAreaView>
            <Text >Sign Up Screen</Text>
            <View>
                <Button title="SignUp" onPress={goToSignUp}/>
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreen;