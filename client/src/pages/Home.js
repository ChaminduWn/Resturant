import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    // Scroll to the top or perform any effect when component mounts
  }, []);

  return (
    <ImageBackground
      source={require('../assets/bg13.jpg')} // Replace with your image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Special goodies for you foodies.
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>
              Embark on a culinary adventure with us! {'\n'}
              Savor exquisite dishes, crafted with love, {'\n'}
              and experience a dining atmosphere like no other. {'\n'}
              Book your table today!
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signinButton}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.buttonText}>Sign in now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 20,
  },
  title: {
    color: '#d4d4d4',
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    textTransform: 'uppercase',
    opacity: 0.75,
  },
  textContainer: {
    marginBottom: 30,
  },
  subtitle: {
    color: '#d4d4d4',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  signinButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#d4d4d4',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  learnMoreButton: {
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
  },
  learnMoreText: {
    color: '#d4d4d4',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
