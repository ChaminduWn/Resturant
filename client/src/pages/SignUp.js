import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value.trim() });
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      return Alert.alert('Error', 'Please fill out all fields.');
    }

    if (formData.username.length < 4 || formData.username.length > 20) {
      return Alert.alert('Error', 'Username must be between 4 and 20 characters.');
    }

    if (formData.username.includes(' ')) {
      return Alert.alert('Error', 'Username cannot contain spaces.');
    }

    if (formData.username !== formData.username.toLowerCase()) {
      return Alert.alert('Error', 'Username must be lowercase.');
    }

    if (!formData.username.match(/^[a-zA-Z0-9]+$/)) {
      return Alert.alert('Error', 'Username can only contain letters and numbers.');
    }

    if (formData.email.length < 6 || !formData.email.includes('@gmail.com')) {
      return Alert.alert('Error', 'Email must be at least 6 characters long and end with @gmail.com.');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      return Alert.alert(
        'Error',
        'Password must be at least 6 characters long and contain both letters and numbers.'
      );
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('https://your-api-endpoint/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('SignIn') },
      ]);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || 'An error occurred');
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/signup.jpg')} // Replace with the correct image path
          style={styles.image}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.header}>Sign Up</Text>
        <Text style={styles.subHeader}>Welcome to Food and Restaurants</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#707070"
          onChangeText={(value) => handleChange('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="name@yourmail.com"
          placeholderTextColor="#707070"
          onChangeText={(value) => handleChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#707070"
          secureTextEntry
          onChangeText={(value) => handleChange('password', value)}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  form: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#707070',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#b71c1c',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#707070',
    marginRight: 5,
  },
  linkText: {
    color: '#b71c1c',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4d4f',
    textAlign: 'center',
    marginTop: 10,
  },
});
