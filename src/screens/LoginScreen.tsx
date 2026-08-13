import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import { colors } from '../theme/colors';

const LoginScreen = ({ navigation }: any) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      Toast.show({ type: 'error', text1: 'Invalid Number', text2: 'Please enter a valid 10-digit mobile number' });
      return;
    }

    // Dummy API call success, navigate directly to verify
    navigation.navigate('VerifyOtp', { mobile: mobileNumber });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Vipra Sathi</Text>
          <Text style={styles.subtitle}>Enter your mobile number to get started</Text>
        </View>

        <CustomInput
          label="Mobile Number"
          placeholder="Enter 10-digit mobile number"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ''))}
          maxLength={10}
        />
        
        <CustomButton
          title="Get OTP"
          onPress={handleSendOtp}
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  button: {
    marginTop: 24,
  },
});

export default LoginScreen;

