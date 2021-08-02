import React from "react"
import {View, Text} from "react-native";

 
function FavouriteScreen(props) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [buttonEnabled, setButtonEnabled] = useState(true)
    let caches = []

    const getAllCaches = () => {
        console.log("Fav - Get All Caches") 
        db.collection("favorites").get().then((querySnapshot) => {
          querySnapshot.forEach((documentFromFirestore) => {
            console.log(`${documentFromFirestore.id}, ${JSON.stringify(documentFromFirestore.data())}`)
            const fav = {
                id:  documentFromFirestore.data().id,
                title: documentFromFirestore.data().title
            }
            console.log("Fav Firestore ",fav)
            caches.push(fav)
          });
          if (caches.length === 0) {
              alert("No Locations found")
              setButtonEnabled(false)
          }
          setData(caches)
        });
        setIsLoading(false)
        console.log("Caches ",caches)
    }

    useEffect( () => {getAllCaches()}, [])

    const saveFavorite = () => {
        const cache =  {
            id: data.id,
            title: data.title }
        db.collection("favorites").add(cache)
            .then(
                (doc)=>{
                    console.log(`Document saved: ${doc.id}`)
                }
            ).catch(
                (err)=> {
                    console.log(`Error saving video ${err}`)
                }
            )
     }
    return (
        <SafeAreaView>
        <Text style={appstyles.title}>My Favorites</Text>
        {/* <Button title="FAVOURITE" disabled={!buttonEnabled} onPress={saveFavorite}/> */}
        { isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
            <FlatList
            data = {data}
            keyExtractor = { (item, index) => { return item.id }} 
            renderItem = { ( {item} ) => (
            <TouchableOpacity  onLongPress={ () => { 
                console.log(` Selected: ${item.id} ${item.title}`)
                saveFavorite()
                 }}>
                <View>
                    <Text style={appstyles.item_title}>{item.title}</Text>
                </View>
                <View  style={appstyles.separator}/>
            </TouchableOpacity>)}
            />
        )}
        
        </SafeAreaView>


    );
}

export default FavouriteScreen;