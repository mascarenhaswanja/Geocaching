import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

const geostyles = StyleSheet.create({
    container: {
        //backgroundColor: '#f3f3f3', 
        backgroundColor: '#bdd3de',
        alignItems: 'center',
        // justifyContent: 'center',
        height: 750
    },
    prompt: {
        fontSize: 30,
        color : '#f3f3aa'
    },
    title: {
        fontSize: 25,
        color: "#0691d6",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        marginTop: 20
    },
    input: {
        width: "auto",
        height: 40,
        borderColor: "#1e380d",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 30
    },
    item_title: {
        fontSize: 20,
        margin: 5,
    },
    separator:{
        padding: 10
    },
})
export {geostyles}