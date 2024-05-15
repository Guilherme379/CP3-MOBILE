import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { db,doc, updateDoc,deleteDoc } from '../app/services/firebaseConfig'


export default function LojaItem(props) {
    const [isChecked, setIsChecked] = useState(props.isChecked)

    const updateIsChecked = async() => {
        const itemRef = doc(db, "produtos", props.id);

        await updateDoc(itemRef, {
            isChecked: isChecked
        });
    }

    const deleteItem = async() =>{
        await deleteDoc(doc(db, "produtos", props.id));
        props.getItem()
    }

    useEffect(()=>{
        updateIsChecked()
    },[isChecked])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Pressable onPress={() => setIsChecked(!isChecked)}>
                    {isChecked ? (
                        <AntDesign name="checkcircle" size={24} color="red" />)
                        :
                        (<AntDesign name="checkcircleo" size={24} color="red" />)
                    }
                </Pressable>

                <Text style={styles.txt}>{props.title}</Text>
                <MaterialIcons 
                    name="delete" 
                    size={24} 
                    color="red"
                    onPress={deleteItem}
                 />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        padding: 10,
        alignItems: 'center',
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
    },
    txt: {
        flex: 1,
        marginLeft: 10,
        fontWeight: "500",
        fontSize: 20
    }
})