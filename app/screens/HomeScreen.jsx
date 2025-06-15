import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import { useBookStore } from '../store/bookStore';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { saveBook } = useBookStore();

  const SearchBooks = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
      const json = await response.json();
      setResults(json.items || []);
    } catch (e) {
      console.error('Search Failed', e);
    }
  };

  const renderItem = ({ item }) => {
    const { title, authors, imageLinks } = item.volumeInfo;
    const thumbnail = imageLinks?.thumbnail;

    return (
      <View style={styles.card}>
        {thumbnail && <Image source={{ uri: thumbnail }} style={styles.thumbnail} />}
        <View style={styles.info}>
          <Text style={styles.title}>{title || 'No Title'}</Text>
          {authors && <Text style={styles.authors}>{authors.join(', ')}</Text>}
          <Button title="Save" onPress={() => saveBook(item)} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Book..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={SearchBooks} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 4,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  authors: {
    color: '#ccc',
    marginBottom: 6,
  },
});
