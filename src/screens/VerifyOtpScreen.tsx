import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useVerifyOtp, useResendOtp } from '../api/auth';
import Toast from 'react-native-toast-message';
import { colors } from '../theme/colors';

const VerifyOtpScreen = ({ route, navigation }: any) => {
  const email = route.params?.email || '';
  const flow = route.params?.flow || 'signup';
  const [otp, setOtp] = useState('');

  const { mutate: verifyOtp, isPending: verifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: resending } = useResendOtp();

  const handleVerify = () => {
    if (!otp) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please enter the OTP' });
      return;
    }

    verifyOtp(
      { email, otp },
      {
        onSuccess: () => {
          Toast.show({ type: 'success', text1: 'Verified', text2: 'OTP verified successfully' });
          if (flow === 'signup') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        },
      }
    );
  };

  const handleResend = () => {
    resendOtp({ email }, {
      onSuccess: () => {
        Toast.show({ type: 'success', text1: 'OTP Resent', text2: 'A new OTP has been sent to your email.' });
      }
    });
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>Enter the code sent to {email}</Text>
        </View>

        <CustomInput
          label="One Time Password (OTP)"
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
        />

        <CustomButton
          title="Verify"
          onPress={handleVerify}
          loading={verifying}
          style={styles.button}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={resending}>
            <Text style={[styles.footerLink, resending && { color: colors.textLight }]}>Resend</Text>
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
    alignItems: 'center',
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
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: colors.textLight,
    fontSize: 14,
  },
  footerLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default VerifyOtpScreen;
