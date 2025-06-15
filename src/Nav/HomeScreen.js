import React, { useState } from "react";

import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const {saveBook} = useBookStore();

    const SearchBooks= async() =>{
        try{
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
            const json =await response.json();
            if(json.items){
                setResults(json.items);
            }else{
                setResults([]);
            }
        }catch(e){
            console.error('Search Failed', e)
        }
    }

    return(
        <View style={Styles.container}>
            <TextInput
                placeholder="Search Book..."
                value={query}
                onChangeText={setQuery}
                style={Styles.input}
            />
        <Button title="Search" onPress={SearchBooks}/>
        <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({item}) =>(
                <View style={Styles.bookCard}>
                <Text>{item.volumeInfo.title}</Text>
                <Button title="Save" onPress={() => saveBook(item)} />
                </View>
                )
            }
        />
        </View>
    );
}

const Styles = StyleSheet.create({
    container : {
        padding : 20,
    },
})

