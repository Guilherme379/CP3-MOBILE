import { Text,View,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign,MaterialIcons } from '@expo/vector-icons';



export default function LojaItem(){
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <AntDesign name="checkcircleo" size={24} color="black" />
                <Text style={styles.txt}>Produto</Text>
                <MaterialIcons name="delete" size={24} color="black" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'lightgray',
        padding:10,
        alignItems:'center',
        width:"90%",
        alignSelf:"center",
        borderRadius:10,
    },
    txt:{
        flex:1,
        marginLeft:10,
        fontWeight:"500",
        fontSize:20
    }
})