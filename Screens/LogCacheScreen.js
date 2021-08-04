import React, {useState, useEffect} from "react"
import { Button, SafeAreaView, Text, View, TextInput, Switch} from "react-native"
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
 
function LogCacheScreen({navigation,route}) {
    const [userComments, setUserComments] = useState('')
    const [description, setDescription] = useState('')
    const [hint, setHint] = useState('')
    const [dtCreated, setDtCreated] = useState('')
    const [isSwitchOn, setIsSwitchOn] = useState(false)
    const [msg,setMsg] = useState('')
  
  
    const {cachSelected} = route.params

    const getGeocache  = () => {
        console.log("cachSelected:", cachSelected);
        db.collection('cachLocations').doc(String(cachSelected)).get()
        .then((querySnapshot) => {
            console.log(querySnapshot.data())
            const cache = querySnapshot.data()
            setDescription(cache.desc)
            setHint(cache.hint)
            setDtCreated(cache.date)
        })
        .catch((error) => {
             console.log("Error getting document:", error);
        });
    }

    const saveGeoCache = () => {
        console.log("Comments ", userComments)
        db.collection("logCache").add({
                cahcLocId : cachSelected,
                comments : userComments,
                updated :  new Date().toLocaleDateString(),
                status: isSwitchOn
            })
            .then((docRef) => {
                console.log(`Document written with ID: ${docRef.id}`);
                setMsg(`Successfully added to logCache`)
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                setMsg("Error while saving logCache!");
            })  
    }

    const switchChanged = (dataFromSwitch) => {
        console.log(dataFromSwitch)
        setIsSwitchOn(dataFromSwitch)
    }

    useEffect( () => {getGeocache()}, [])

    return (
      <SafeAreaView style={geostyles.container}>
          <Text style={geostyles.title}>Log Geocach</Text>
          <Text style={geostyles.log_geocache}>{description}</Text>
          <Text style={geostyles.log_geocache}>{hint}</Text>
          <Text style={geostyles.log_geocache}>{dtCreated}</Text>
          <Text style={geostyles.log_geocache}>Tasked Completed ? 
            <Switch
                onValueChange={switchChanged}
                value={isSwitchOn}              
            />
        </Text>
                
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
