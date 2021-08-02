import React,{useState} from "react";
import { Button, SafeAreaView,TextInput ,Text ,View} from "react-native";
import { db } from "../utilities/FirebaseManager";
import * as Location from "expo-location";



const AddCachLoc = ({navigation,route}) => {
    const [locDesc, setLocDesc] = useState('')
    const [locHint,setLocHint] = useState('')
    const [locLat,setLocLat] = useState('')
    const [locLng,setLocLng] = useState('')
    const [msg,setMsg] = useState('')

   const saveCachLoc = ()  => {
       const cachLocation = {
           lat : locLat,
           lng : locLng,
           desc : locDesc,
           hint : locHint,
           date : new Date().toLocaleDateString(),
           isActive : true
       }

    db.collection("cachLocations").add(cachLocation)
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setMsg(`Successfully added`)
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        setMsg("Error while saving Cach Location!");
    });
   }   

   const fetchCurrentLocation = () => {
        Location.requestForegroundPermissionsAsync()
        .then(
          (result) => {
            if (result.status === "granted") {
              console.log("User gave us permission to access their location")
              return Location.getCurrentPositionAsync({})
            }
            else {
              console.log("User denied permission")
              throw new Error("User didn't grant the permission");
            }
          }
        )
        .then( (location) => {
          console.log(`location recieved : ${JSON.stringify(location)}`)
          setLocLat(location.coords.latitude)
          setLocLng(location.coords.longitude)
        })
        .catch((err)=>{
          console.log("Error when requesting permission")
          console.log(err)
          setMsg("Error give us permission")
          //update the UI to inform user of deny permission
        })

   }


    return (
        <View>
              <TextInput
                onChangeText={(desc) =>
                    setLocDesc(desc)
                }
                placeholder="Enter description.."  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
            />    
              <TextInput
                onChangeText={(hint) =>
                    setLocHint(hint)
                }
                placeholder="Enter hint"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
            />    

              <Button title="Fetch Location" onPress={fetchCurrentLocation}/>

              <TextInput
                onChangeText={(lat) =>
                  setLocLat(lat)
                }
                placeholder="Enter Latitude"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                value={locLat}

            />    
              <TextInput
                onChangeText={(lng) =>
                  setLocLng(lng)
                }
                placeholder="Enter Longitude"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                value={locLng}
            />    
                  
            <Button title="Save Cach" onPress={saveCachLoc}/>

<Text>{msg}</Text>
        </View>
    );
}

export default AddCachLoc;