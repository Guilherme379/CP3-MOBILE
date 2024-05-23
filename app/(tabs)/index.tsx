import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator,ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { app, db, collection, addDoc, getDocs, deleteDoc, doc } from '../services/firebaseConfig';
import LojaItem from '@/components/LojaItem';

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [produtosList, setProdutosList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "produtos"), {
        title: title,
        isChecked: false
      });
      
      alert("PRODUTO CADASTRADO");
      setTitle('');
      getItem();

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getItem = async () => {
    let d = [];
    const querySnapshot = await getDocs(collection(db, "produtos"));
    querySnapshot.forEach((doc) => {
      const produtos = {
        id: doc.id,
        title: doc.data().title,
        isChecked: doc.data().isChecked
      };

      d.push(produtos);
    });
    setProdutosList(d);
    setIsLoading(false);
  };

  const deleteItemList = async () => {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "produtos", item.id)));
    getItem();
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <ImageBackground 
    source={require('../../assets/images/McQueen.jpg')}
    style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Lista de Carros</Text>
        <Text style={styles.numItem}>{produtosList.length}</Text>
        <MaterialIcons name="delete" size={24} color="black" onPress={deleteItemList} />
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={produtosList}
          renderItem={({ item }) => (
            <LojaItem title={item.title} isChecked={item.isChecked} id={item.id} getItem={getItem} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <TextInput
        placeholder='Digite o nome do produto'
        style={styles.input}
        value={title}
        onChangeText={(value) => setTitle(value)}
        onSubmitEditing={addItem}
      />
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e29494',
  },
  header: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    flex: 1,
    fontSize: 20,
    color: '#ffffff',
  },
  numItem: {
    fontSize: 20,
    marginRight: 20,
  },
  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
