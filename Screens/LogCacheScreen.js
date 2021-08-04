import React, {useState, useEffect} from "react"
import { Button, SafeAreaView, Text, View, TextInput} from "react-native"
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
 
function LogCacheScreen({navigation,route}) {
    const [userComments, setUserComments] = useState('')
    const [description, setDescription] = useState('')
    const [dtCreated, setDtCreated] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
  
    const {cachSelected} = route.params

    const getGeocache  = () => {
        console.log("cachSelected:", cachSelected);
        db.collection('cachLocations').doc(String(cachSelected)).get()
        .then((querySnapshot) => {
            console.log(querySnapshot.data());
            // querySnapshot.forEach((documentFromFirestore) => {
            //     console.log(`Firestore ${documentFromFirestore.id}  ${JSON.stringify(documentFromFirestore.data())}`)
            //     if (cachSelected === documentFromFirestore.data().cahcLocId) {
            //       console.log(`Cach Detail: ${documentFromFirestore.data()}`)
            //   }
            // })
            // setDescription('')
            // setDtCreated('')
        })
        .catch((error) => {
             console.log("Error getting document:", error);
        });

        // db.collection('cachLocations').doc(cachSelected).get()
        // .then((doc) => {      
        //     if (doc.exists) {
        //       console.log("Document data:", doc.data());
        //     } else {
        //     // doc.data() will be undefined in this case
        //       console.log("Geocaching doesnt exist");
        //     }
        // })
        // .catch((error) => {
        //      console.log("Error getting document:", error);
        // });
    }

    const saveGeoCache = () => {
        console.log("Comments ", userComments)
        db.collection("logCache").add({
                cahcLocId : cachSelected,
                comments : userComments,
                // updated : currendate,
                // status: userStatus
            })
            .then((docRef) => {
                console.log(`Document written with ID: ${docRef.id}`);
                setMsg(`Successfully added to logCache`)
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                setMsg("Error while saving logCache!");
            })  
            setMsg('')
    }

    useEffect( () => {getGeocache()}, [])

    return (
      <SafeAreaView style={geostyles.container}>
          <Text style={geostyles.title}>Log Geocach</Text>
          <Text style={geostyles.log_geocache}>{"Description"}</Text>
          <Text style={geostyles.log_geocache}>{"Hidden by zzzz"}</Text>
          <Text style={geostyles.log_geocache}>{"Created Date"}</Text>
          <Text style={geostyles.log_geocache}>{"Dropdown: Found, Not Found, In Progress"}</Text>
          <View style={geostyles.text_box} >
              <TextInput
                  style={geostyles.text_geocache}
                  placeholder="Write Your Comment"  
                  placeholderTextColor="#243b16"
                  autoCapitalize="none"
                  returnKeyType="next"
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(userComments) =>
                    setUserComments(userComments)
                  }
              />    
          </View>
          <Button title="Save" onPress={saveGeoCache}/>
      </SafeAreaView>
    )
  }
  
  export default LogCacheScreen;