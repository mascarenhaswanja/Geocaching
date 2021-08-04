import React, { useState, useEffect } from "react"
import {View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
import AsyncStorage from '@react-native-async-storage/async-storage';
 
function FavouriteScreen({navigation,route}) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [msg,setMsg] = useState('')
    
    let caches = []

    const getAllFavorites = () => {
      AsyncStorage.getItem("email").then(
        (dataFromStorage) =>{
          return dataFromStorage
        }
      )

      .then(
        (userEmail) => {
          db.collection("favourites").get()
          .then((querySnapshot) => {
            //console.log("User ",userEmail)
            querySnapshot.forEach((documentFromFirestore) => {
            const fav = {
              cahcLocId:  documentFromFirestore.id,
              email: documentFromFirestore.data().userEmail
            }
            if (userEmail === fav.email) {
                // console.log(`Cach: ${fav.cahcLocId}, ${fav.email}`)
                caches.push(fav)
              }
            })
            if (caches.length === 0) {
              alert("No Caches found")
            }
            setData(caches)
            setIsLoading(false)
          })

        .catch((error) => {
            console.error("Error retrieve Caches: ", error)
            setMsg("Error while retrieve Fav Cach")
        })
        }
      )
    }
    useEffect( () => {getAllFavorites()}, [])

    return (
        <SafeAreaView style={geostyles.container}>
        <Text style={geostyles.title}>My Favorites</Text>
  
        { isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
            <FlatList
            data = {data}
            keyExtractor = { (item, index) => { return item.cahcLocId }} 
            renderItem = { ( {item} ) => (
            <TouchableOpacity  onLongPress={ () => { 
                console.log(` Selected: ${item.cahcLocId}`)
                navigation.navigate("LogCache", {cachSelected: item.cahcLocId})
                }}>
                <View>
                  <Text style={geostyles.item_title} id={item.cahcLocId}  >{item.cahcLocId}</Text>
                </View>
                <View  style={geostyles.separator}/>
            </TouchableOpacity>)}
            />
        )}       
        </SafeAreaView>
    );
}

export default FavouriteScreen;