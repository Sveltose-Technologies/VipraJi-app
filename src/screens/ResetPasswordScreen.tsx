import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useResetPassword } from '../api/auth';
import Toast from 'react-native-toast-message';
import { colors } from '../theme/colors';

const ResetPasswordScreen = ({ route, navigation }: any) => {
  const email = route.params?.email || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleReset = () => {
    if (!newPassword || !confirmPassword) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please fill in all fields' });
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Passwords do not match' });
      return;
    }

    resetPassword(
      { email, newPassword, confirmPassword },
      {
        onSuccess: () => {
          Toast.show({ type: 'success', text1: 'Password Reset', text2: 'Your password has been successfully reset' });
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
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
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your new password below</Text>
        </View>

        <CustomInput
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <CustomInput
          label="Confirm Password"
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <CustomButton
          title="Reset Password"
          onPress={handleReset}
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

export default ResetPasswordScreen;
