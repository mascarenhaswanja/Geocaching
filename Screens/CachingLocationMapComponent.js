import React, {useState, useEffect} from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from 'react-native-maps';



const MapComponent = (props) => {
    const [pins, setPins] = useState([])
    //console.log("Props markers => ", props.markers)
    
    const pinsMarker = () => {
      setPins(props.markers)
      console.log("Pins => ", pins)
    }
    
    const onMarkerPress = (location) => {
      console.log("Press pin ",location)
    }
   
    useEffect(()=>{pinsMarker()},[])

    const [currRegion,setCurrentRegion] = useState({
        latitude: 43.6163539,
        longitude:  -79.3793008,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,   
      }
     )


    return (
        <View>
          
           {/* {pins && <MapView */}
           <MapView
           style={{width: Dimensions.get('window').width, height:300}}
           initialRegion={currRegion}
           showCurrentLocation='true'
           showsCompass={true}
           maxZoomLevel={8}>
           {/* <Marker coordinate={{latitude: props.lat, longitude: props.lng}} title={props.desc} onPress={()=> {console.log("Marker clicked")}}/> */}
            {/* <Marker coordinate={{latitude: Number(props.lat), longitude: Number(props.lng)}} title={props.desc} onPress={()=> {console.log("Marker clicked")}}/> */}
            {/* {pins && pins.map((location, index) => { */}
            {pins.map((location, index) => {
                return (
                        <Marker
                            key={index}
                            coordinate={{latitude: location.lat, longitude: location.lng}}
                            title={location.desc}
                            // description={"address"}
                            onPress={onMarkerPress(location)}
                        />
                    )
                })
              }
 
           </MapView>
        {/* } */}
        </View>
    )
}

export default MapComponent;
