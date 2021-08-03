import React, { useState, useEffect } from "react"
import {View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
import AsyncStorage from '@react-native-async-storage/async-storage';
 
function FavouriteScreen(props) {
    const [userEmail, setUserEmail] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    //const [buttonEnabled, setButtonEnabled] = useState(true)
    
    let caches = []

    const getAllFavorites = () => {
        console.log("Fav - Get All Favorite Caches") 
        getEmail()

        db.collection("favourites").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentFromFirestore) => {
          
            const fav = {
              cahcLocId:  documentFromFirestore.id,
              email: documentFromFirestore.data().userEmail
            }
             
            if (userEmail ===  documentFromFirestore.data().userEmail) {
              console.log(`Cach: ${fav.cahcLocId}, ${fav.email}`)
              caches.push(fav)
            }
            //console.log("Fav Firestore ",fav)
            
          })
          if (caches.length === 0) {
              alert("No Caches found")
              //setButtonEnabled(false)
          }
          setData(caches)
        })
        .catch((error) => {
          console.error("Error retrieve Caches: ", error);
          setMsg("Error while retrieve Fav Cach");
        })  
        setIsLoading(false)
        console.log("Caches ",caches)
    }

    useEffect( () => {getAllFavorites()}, [])

    const getEmail = () => {
        AsyncStorage.getItem("email")
          .then( 
            (dataFromStorage) => {
              if (dataFromStorage === null) {
                console.log(`Could not found`)
              } else {
                console.log(`Successful get Email ${dataFromStorage}`)
                setUserEmail(dataFromStorage)
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
        <SafeAreaView>
        <Text style={geostyles.title}>My Favorites</Text>
        {/* <Button title="FAVOURITE" disabled={!buttonEnabled} onPress={saveFavorite}/> */}
        { isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
            <FlatList
            data = {data}
            keyExtractor = { (item, index) => { return item.id }} 
            renderItem = { ( {item} ) => (
            <TouchableOpacity  onLongPress={ () => { 
                console.log(` Selected: ${item.id}`)
                 }}>
                <View>
                    <Text style={geostyles.item_title}>{item.id}</Text>
                </View>
                <View  style={geostyles.separator}/>
            </TouchableOpacity>)}
            />
        )}
        
        </SafeAreaView>


    );
}

export default FavouriteScreen;