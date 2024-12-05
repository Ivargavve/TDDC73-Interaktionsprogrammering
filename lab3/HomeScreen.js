import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [language, setLanguage] = useState('');

  const handleSearch = () => {
    if (language) {
      navigation.navigate('Github Repos', { language });
    } else {
      alert('Please enter a programming language!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Trending Repositories</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter programming language (e.g., JavaScript)"
        value={language}
        onChangeText={setLanguage}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
