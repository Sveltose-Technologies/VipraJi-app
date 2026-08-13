import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

const VerifyOtpScreen = ({ route, navigation }: any) => {
  const mobile = route.params?.mobile || '';
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const { login } = useAuth();

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please enter the OTP' });
      return;
    }

    setVerifying(true);
    
    // Simulate network request
    setTimeout(async () => {
      setVerifying(false);
      Toast.show({ type: 'success', text1: 'Verified', text2: 'OTP verified successfully' });
      
      // Dummy UID for mockup
      const mockUid = `usr_${Math.random().toString(36).substr(2, 9)}`;
      await login(mockUid, mobile);
    }, 1000);
  };

  const handleResend = () => {
    Toast.show({ type: 'success', text1: 'OTP Resent', text2: `A new OTP has been sent to ${mobile}.` });
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>Enter the code sent to +91 {mobile}</Text>
        </View>

        <CustomInput
          label="One Time Password (OTP)"
          placeholder="Enter OTP (e.g., 1234)"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
        />

        <CustomButton
          title="Verify & Login"
          onPress={handleVerify}
          loading={verifying}
          style={styles.button}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.footerLink}>Resend</Text>
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

