import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useVerifyForgotPasswordOtp } from '../api/auth';
import Toast from 'react-native-toast-message';
import { colors } from '../theme/colors';

const VerifyForgotOtpScreen = ({ route, navigation }: any) => {
  const email = route.params?.email || '';
  const [otp, setOtp] = useState('');

  const { mutate: verifyOtp, isPending } = useVerifyForgotPasswordOtp();

  const handleVerify = () => {
    if (!otp) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please enter the OTP' });
      return;
    }

    verifyOtp(
      { email, otp },
      {
        onSuccess: () => {
          Toast.show({ type: 'success', text1: 'Verified', text2: 'Please enter your new password' });
          navigation.navigate('ResetPassword', { email });
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
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>Enter the reset code sent to {email}</Text>
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
          title="Verify Code"
          onPress={handleVerify}
          loading={isPending}
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
    alignItems: 'center',
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
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
});

export default VerifyForgotOtpScreen;
