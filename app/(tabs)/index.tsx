import { ActivityIndicator,FlatList,TextInput, View, Image, StyleSheet, Platform, Text } from 'react-native';
import LojaItem from '@/components/LojaItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { app, db, getFirestore, collection, addDoc, getDocs, deleteDoc,doc } from '../services/firebaseConfig'
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [title, setTitle] = useState('')
  const[produtosList,setProdutosList]=useState([])

  const addItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "produtos"), {
        title: title,
        isChecked: false
      });
      
      alert("PRODUTO CADASTRADO")
      setTitle('')
      getItem()

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const getItem = async() => {
    let d = []
    const querySnapshot = await getDocs(collection(db, "produtos"));
    querySnapshot.forEach((doc) => {

      const produtos = {
        id:doc.id,
        title:doc.data().title,
        isChecked:doc.data().isChecked
      }

      d.push(produtos)
    });
    setProdutosList(d)
  }

  const deleteItemList = async() =>{
    const querySnapshot = await getDocs(collection(db, "produtos"));
    querySnapshot.docs.map((item)=>deleteDoc(doc(db,"produtos",item.id)))
    getItem()
  }

  useEffect(()=>{
    getItem()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Lista de Produtos</Text>
        <Text style={styles.numItem}>{produtosList.length}</Text>
        <MaterialIcons name="delete" size={24} color="black"
          onPress={deleteItemList}
        />
      </View>

      
      {produtosList.length>0?<FlatList 
        data={produtosList}
        renderItem={({item})=>{
          return(
            <View>
              <LojaItem 
                title={item.title}
                isChecked={item.isChecked}
                id={item.id}  
                getItem={getItem}
              />
            </View>
          )
        }}
      />:<ActivityIndicator/>}

      

      <TextInput
        placeholder='Digite o nome do produto'
        style={styles.input}
        value={title}
        onChangeText={(value) => setTitle(value)}
        onSubmitEditing={addItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    width: "90%",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center'
  },
  heading: {
    flex: 1,
    fontSize: 20
  },
  numItem: {
    fontSize: 20,
    marginRight: 20
  },
  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 10
  }
});
