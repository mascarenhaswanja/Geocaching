import React from "react"
import {View, Text} from "react-native";
import AddCachLoc from "./AddCachingLocationComponent";

//define the exponent
function ProfileScreen(props) {
    return (
        <View>
            <Text>Profile Screen</Text>
            <AddCachLoc />
        </View>
    );
}



//export the component
export default ProfileScreen;