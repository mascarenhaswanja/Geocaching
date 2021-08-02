import React from "react"
import {View} from "react-native";

import GeoCachingList from "./GeoCachingListComponent";



//define the exponent
function MapGeoCachingScreen(props) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <GeoCachingList />
       
        </View>
      );
    
}



//export the component
export default MapGeoCachingScreen;