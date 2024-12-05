import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Animated, Image, ImageBackground, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Index() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [cardNumber, setCardNumber] = useState("#### #### #### ####");
  const [cardHolder, setCardHolder] = useState("Name");
  const [cvv, setCvv] = useState("");
  const [fadeAnims, setFadeAnims] = useState<Animated.Value[]>([]); // Store animations for each typed letter

  // Function to determine the card logo based on card number
  const getCardLogo = () => {
    const numericText = cardNumber.replace(/\D/g, ''); // Remove non-numeric characters
    if (numericText.startsWith('4')) {
      return require('../visa.png'); // Visa
    }
    return require('../master.svg'); // MasterCard as the default
  };

  // Validates card number input
  const handleCardNumberChange = (text: string) => {
    const numericText = text.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedText = numericText.replace(/(.{4})/g, '$1 ').trim(); // Format as '#### #### #### ####'
    
    if (numericText.length <= 16) { // Ensure max length is 16 digits
      setCardNumber(formattedText);
    }
  };

  // Validates card holder input and triggers letter animation
  const handleCardHolderChange = (text: string) => {
    const nameWithoutNumbers = text.replace(/[0-9]/g, ''); // Remove numbers
    if (nameWithoutNumbers.length <= 30) { // Set a maximum length for card holder's name
      setCardHolder(nameWithoutNumbers);

      // Trigger the fade-in animation for the newly typed letter
      const newFadeAnim = new Animated.Value(0); // Create a new fade animation for the new letter
      setFadeAnims(prev => [...prev, newFadeAnim]); // Store it in an array of animations

      Animated.timing(newFadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // Validates CVV input
  const handleCvvChange = (text: string) => {
    const numericText = text.replace(/\D/g, ''); // Allow only digits
    if (numericText.length <= 3) { // CVV is usually 3 digits
      setCvv(numericText);
    }
  };

// Function to split cardholder name and render each letter with animation
const renderCardHolderName = () => {
  return (
    <View style={{ flexDirection: 'row' }}> {/* Ensure letters are displayed horizontally */}
      {cardHolder.split('').map((letter, index) => {
        // Use the corresponding fadeAnim for each letter
        const fadeAnim = fadeAnims[index] || new Animated.Value(0);

        return (
          <Animated.Text
            key={index}
            style={[styles.cardHolderName, { opacity: fadeAnim }]}>
            {letter}
          </Animated.Text>
        );
      })}
    </View>
  );
};


  return (
    <View style={styles.container}>
      {/* Credit Card Preview */}
      <ImageBackground 
        source={require('../dark.avif')} 
        style={styles.card} 
        imageStyle={styles.cardImage}
      >
        {cvv ? ( // if cvv has a value, display backside of card
          <View style={styles.cardBack}>
            <Text style={styles.cvvText}>CVV: {cvv}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.cardNumber}>{cardNumber}</Text>
            <Image 
              source={getCardLogo()} // Use the function to get the correct logo
              style={styles.cardLogo} // Style for the logo
              resizeMode="contain" // Ensure the image maintains its aspect ratio
            />
            <View style={styles.cardBottomInfo}>
              <View>
                <Text style={styles.cardHolderLabel}>Card Holder</Text>
                {renderCardHolderName()}
              </View>
              <View>
                <Text style={styles.expirationLabel}>Expires</Text>
                <Text style={styles.expirationDate}>
                  {selectedMonth ? `${selectedMonth.padStart(2, '0')}/${selectedYear.slice(-2)}` : "MM/YY"}
                </Text>
              </View>
            </View>
          </>
        )}
      </ImageBackground>

      {/* Card Details Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="#### #### #### ####" 
          onChangeText={handleCardNumberChange} // Validate on change
        />

        <Text style={styles.label}>Card Holder</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          onChangeText={handleCardHolderChange} // Validate on change and animate typed letters
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Expiration Date</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                style={styles.dropdown}
              >
                <Picker.Item label="Month" value="" />
                {[...Array(12).keys()].map((i) => (
                  <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                ))}
              </Picker>

              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                style={styles.dropdown}
              >
                <Picker.Item label="Year" value="" />
                {[...Array(10).keys()].map((i) => (
                  <Picker.Item key={i + 2023} label={`${i + 2023}`} value={`${i + 2023}`} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>CVV</Text>
            <TextInput 
              style={styles.input} 
              placeholder="CVV" 
              secureTextEntry 
              onChangeText={handleCvvChange} // Validate on change
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1CEDC', // Light blue background color for the main container
  },
  card: {
    width: '85%',
    height: 160,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden', // Ensures rounded corners on image background
  },
  cardImage: {
    borderRadius: 10, // Rounded corners on image inside card
    resizeMode: 'cover', // Ensures the image covers the entire card area
    width: '100%', // Full width
    height: '100%', // Full height
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardLogo: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 60, // Adjust size as necessary
    height: 30, // Adjust size as necessary
  },
  cardBottomInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolderLabel: {
    color: '#bbb',
    fontSize: 10,
  },
  cardHolderName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardHolderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  expirationLabel: {
    color: '#bbb',
    fontSize: 10,
    textAlign: 'right',
  },
  expirationDate: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  form: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    flex: 1,
    height: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0066FF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardBack: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  cvvText: {
    color: '#fff',
    fontSize: 18,
  },
});
