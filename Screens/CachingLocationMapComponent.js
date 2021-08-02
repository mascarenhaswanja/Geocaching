import React,{useState} from "react";
import { View, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from 'react-native-maps';



const MapComponent = (props) => {
    const [currRegion,setCurrentRegion] = useState({
        latitude: 43.6163539,
        longitude:  -79.3793008,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,   
      }
     )

    return (
        <View>
          <MapView
           style={{width: Dimensions.get('window').width, height:300}}
           initialRegion={currRegion}
           showCurrentLocation='true'
           showsCompass={true}
           maxZoomLevel={8}>
           <Marker coordinate={{latitude: props.lat, longitude: props.lng}} title={props.desc} onPress={()=> {console.log("Marker clicked")}}/>

         </MapView>
        </View>
    )
}

export default MapComponent;