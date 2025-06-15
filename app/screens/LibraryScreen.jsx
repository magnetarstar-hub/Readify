import React  from "react";
import { View, FlatList,Set, Text, Button,StyleSheet } from "react-native";
import { useBookStore } from "../store/bookStore";

export default function LibraryScreen() {
    const { savedBooks, removeBook } = useBookStore();
    const renderItem = ({item}) =>{
        const {
            title,
            author,
            imageLinks,
        } = item.volumeInfo || {};
    const thumbnail = imageLinks?.thumbnail;

    return(
        <View style={styles.Card}>
            {thumbnail && <Image source={{ uri: thumbnail }} style={styles.thumbnail} />}
            <View style={styles.details}>
            <Text style={styles.title}>{title || 'No Title'}</Text>
            <Button title="Remove" onPress={() => removeBook(item.id)} />
        </View>
        </View>
    );
};
    return (
    <View style={styles.container}>
      {savedBooks.length === 0 ? (
        <Text style={styles.empty}>Your library is empty. Add books from the Home screen.</Text>
      ) : (
        <FlatList
          data={savedBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
        />
      )}
    </View>
     );

}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1 },
    card: {
      flexDirection: 'row',
      marginBottom: 10,
      backgroundColor: '#f2f2f2',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    thumbnail: {
      width: 50,
      height: 75,
      marginRight: 10,
    },
    details: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
    },
    empty: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 50,
      color: '#666',
    },
  });
