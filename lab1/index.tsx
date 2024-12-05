import React, { useState } from "react";
import { View, Text, TextInput, Image, Button, StyleSheet } from "react-native";

// npx expo start -> w

export default function Index() {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Example 3: React Native</Text>
      </View>

      {/* Image */}
      <Image
        source={require("../img.png")}
        style={styles.image}
      />

      {/* Buttons in a 2x2 Grid */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button title="BUTTON" onPress={() => {}} color="#B0C4DE" />
          <Button title="BUTTON" onPress={() => {}} color="#B0C4DE" />
        </View>
        <View style={styles.buttonRow}>
          <Button title="BUTTON" onPress={() => {}} color="#B0C4DE" />
          <Button title="BUTTON" onPress={() => {}} color="#B0C4DE" />
        </View>
      </View>

      {/* Email Input */}
      <View style={styles.emailContainer}>
        <Text style={styles.emailLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  topBar: {
    width: "100%",
    padding: 16,
    backgroundColor: "#4CAF50",
    alignItems: "flex-start",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#D32F2F",
  },
  emailLabel: {
    fontSize: 16,
    color: "#757575",
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#000",
  },
});
