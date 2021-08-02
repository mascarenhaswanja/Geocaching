import { StyleSheet } from "react-native";

const geostyles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#f3f3f3', 
        backgroundColor: '#bdd3de',
        alignItems: 'center',
        // justifyContent: 'center',
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
})
export {geostyles}