import React, {useState} from "react";
import { View, Text, StyleSheet, Button, FlatList,ActivityIndicator, Pressable } from "react-native";
import { db } from "../utilities/FirebaseManager";
import { useEffect } from "react";
import MapComponent from "./CachingLocationMapComponent"
import AsyncStorage from '@react-native-async-storage/async-storage'

const GeoCachingList = ({navigation,route}) => {
    const [locPinData,setLocPinData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [mapLng,setMapLng] = useState('');
    const [mapLat,setMapLat] = useState('');
    const [mapDesc,setMapDesc] = useState('');
    const [msg,setMsg] = useState('')
    const [email,setEmail] = useState('')

    let tempLocArray = [];

    const getGeoCachingLocationFromFirebase = () => {
        db.collection("cachLocations").get().then((querySnapshot) => {
            querySnapshot.forEach((documentFromFirestore) => {
            // tempArray.push({title : documentFromFirestore.get("title"), id : documentFromFirestore.id});
            // setListData(tempArrray);
            tempLocArray.push({
                lat : documentFromFirestore.get("lat"),
                lng : documentFromFirestore.get("lng"), 
                desc : documentFromFirestore.get("desc"), 
                hint : documentFromFirestore.get("hint"), 
                key : documentFromFirestore.id })

            setLocPinData(tempLocArray);
            });
          });
          getEmail()
          setLoading(false)
    }

    useEffect(()=>{getGeoCachingLocationFromFirebase()}, []);

    const addCachingLocToFav = (id) => {    
        db.collection("favourites").add({
            cahcLocId : id,
            userEmail : email
        })
        .then((docRef) => {
            console.log(`Document written with ID: ${docRef.id}`);
            setMsg(`Successfully added to favourites`)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            setMsg("Error while saving Cach Location to fav!");
        })  
        setMsg('')
    }

    const getEmail = () => {
        AsyncStorage.getItem("email")
          .then( 
            (dataFromStorage) => {
              if (dataFromStorage === null) {
                console.log(`Could not found`)
              } else {
                console.log(`Successful get Email ${dataFromStorage}`)
                setEmail(dataFromStorage)
              }
            }
          )
          .catch(
            (error) => {
              console.log(`Error get Primitive item ${error}`)
            }
          )
      }

    return (
    <View>
    {isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
       <FlatList
                data = {locPinData}
                keyExtractor = { (item, index) => {return item.key;}}
                renderItem = { ({item}) => (<Pressable onPress={ () => { setMapLat(item.lat); setMapLng(item.lng); setMapDesc(item.desc)}}>
                    <View >
                        <Text  id={item.key} > {item.desc} </Text>
                        <Text>{item.hint}</Text>
                        <Button title="Add To Fav" onPress={()=>{addCachingLocToFav(item.key)}}></Button>
                    </View>
                </Pressable>)}
                /> 
    )}
    <Text>{msg}</Text>


    {/* <MapComponent lat={mapLat} lng={mapLng} desc={mapDesc}/> */}
    <MapComponent markers={locPinData}/>
    </View>)
}

export default GeoCachingList