import React  from "react";
import { View, FlatList, Text, Button, StyleSheet, Image } from 'react-native';
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
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          numColumns={3}
        />
      )}
    </View>
     );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
    Card: {
        flex: 1,
        margin: 5,
        borderRadius: 8,
        backgroundColor: '#1a1a1a',
        padding: 10,
        alignItems: 'center',
    },
    thumbnail: {
        width: 100,
        height: 150,
        borderRadius: 5,
    },
    details: {
        marginTop: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
