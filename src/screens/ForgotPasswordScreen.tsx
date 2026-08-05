import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useForgotPassword } from '../api/auth';
import Toast from 'react-native-toast-message';
import { colors } from '../theme/colors';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = () => {
    if (!email) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please enter your email' });
      return;
    }

    forgotPassword(
      { email, role: 'pandit' },
      {
        onSuccess: () => {
          Toast.show({ type: 'success', text1: 'OTP Sent', text2: 'Check your email for the reset code' });
          navigation.navigate('VerifyForgotOtp', { email });
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>Enter your email to receive a reset OTP</Text>
        </View>

        <CustomInput
          label="Email Address"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <CustomButton
          title="Send Reset OTP"
          onPress={handleSubmit}
          loading={isPending}
          style={styles.button}
        />

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerLink}>Back to Log In</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  button: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
