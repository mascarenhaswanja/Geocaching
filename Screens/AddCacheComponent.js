import React from "react"
import {View, Text} from "react-native";
import AddCachLoc from "./AddCachingLocationComponent";

//define the exponent
function AddCache(props) {
    return (
        <View>
            <Text>Profile Screen</Text>
            <AddCachLoc />
        </View>
    );
}



//export the component
export default AddCache;