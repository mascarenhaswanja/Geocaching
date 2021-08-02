import React, {useState,useEffect} from "react"
import {View, Text, Dimensions, Button} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker , Animated } from 'react-native-maps';
import { db } from "../utilities/FirebaseManager"



//define the exponent
function MapGeoCachingScreen(props) {
    const [locPinData,setLocPinData] = useState([]);
    const [currRegion,setCurrentRegion] = useState({
        latitude: 43.6163539,
        longitude:  -79.3793008,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,   
      }
     )
    const [selectedPin,setSelectedPin] = useState('');
    const [showAddToFav, setShowAddToFav] = useState(false);

    const getGeoCachingLocationFromFirebase = () => {
        const tempLocArray = [];
        db.collection("cachLocations").get().then((querySnapshot) => {
            querySnapshot.forEach((documentFromFirestore) => {
            // tempArray.push({title : documentFromFirestore.get("title"), id : documentFromFirestore.id});
            // setListData(tempArrray);
            tempLocArray.push({lat : documentFromFirestore.get("lat"), lng : documentFromFirestore.get("lng"), desc : documentFromFirestore.get("desc"), key : documentFromFirestore.id })

            setLocPinData(tempLocArray);
            });
          });
    }

    useEffect(()=> {getGeoCachingLocationFromFirebase()},[]);

    
     const onMapMoved = (data) => {
       console.log(data)
     }

     const onMarkerSelected = (docId) => {
        // setShowAddToFav(true);
        // setSelectedPin(docId);
     }

     const AddToFavClick = () => {
        db.collection("favourites").add(selectedPin)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setResult(`Successfully added to Fav List`)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            setResult("Error while adding to Fav List!");
        });
     }

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>MapScreen!</Text>
          <MapView
           style={{width: Dimensions.get('window').width, height:600}}
           initialRegion={currRegion}
           onRegionChangeComplete={onMapMoved}
           showCurrentLocation='true'
           showsCompass={true}
           maxZoomLevel={8}
           
         >
           {/* <Marker coordinate={{latitude: 45.51, longitude: -73.5775}} title="Pin" onPress={()=> {console.log("Marker clicked")}}/>
           <Marker coordinate={{latitude: 45.41, longitude: -73.5775}} title="New Pin"/> */}
    
           {
               locPinData.map((pin) => {
               return <Marker key={pin.key} coordinate={{latitude: pin.lat , longitude: pin.lng}} title={pin.desc} onPress={onMarkerSelected(pin.key)}/>
               })
           }
           </MapView> 
           { showAddToFav ? <></> : <View>
               <Text>Marker details</Text>
               <Button title="Add To Fav" onPress={AddToFavClick}></Button>
            </View>  }
              
        </View>
      );
    
}



//export the component
export default MapGeoCachingScreen;