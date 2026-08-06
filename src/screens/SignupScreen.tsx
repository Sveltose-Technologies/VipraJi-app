import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useSignup } from '../api/auth';
import Toast from 'react-native-toast-message';
import { colors } from '../theme/colors';

const SignupScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: signup, isPending } = useSignup();

  const handleSignup = () => {
    if (formData.password !== formData.confirmPassword) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Passwords do not match' });
      return;
    }
    if (!formData.email || !formData.password || !formData.fullName) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please fill all required fields' });
      return;
    }

    signup(formData, {
      onSuccess: () => {
        Toast.show({ type: 'success', text1: 'Signup Successful', text2: 'Please verify your OTP' });
        navigation.navigate('VerifyOtp', { email: formData.email, flow: 'signup' });
      },
      onError: (error: any) => {
        console.log('--- SIGNUP ERROR ---');
        console.log(error);
        if (error.response) {
          console.log('Data:', error.response.data);
          console.log('Status:', error.response.status);
        }
      },
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up for VipraJi</Text>
        </View>

        <CustomInput
          label="Full Name"
          placeholder="Enter full name"
          value={formData.fullName}
          onChangeText={(val) => updateField('fullName', val)}
        />
        <CustomInput
          label="Display Name"
          placeholder="Enter display name"
          value={formData.displayName}
          onChangeText={(val) => updateField('displayName', val)}
        />
        <CustomInput
          label="Mobile Number"
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          value={formData.mobileNumber}
          onChangeText={(val) => updateField('mobileNumber', val)}
        />
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(val) => updateField('email', val)}
        />
        <CustomInput
          label="Password"
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={(val) => updateField('password', val)}
          rightIcon={<Icon name={showPassword ? "eye-off" : "eye"} size={20} color={colors.textLight} />}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />
        <CustomInput
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry={!showConfirmPassword}
          value={formData.confirmPassword}
          onChangeText={(val) => updateField('confirmPassword', val)}
          rightIcon={<Icon name={showConfirmPassword ? "eye-off" : "eye"} size={20} color={colors.textLight} />}
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <CustomButton
          title="Sign Up"
          onPress={handleSignup}
          loading={isPending}
          style={styles.button}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
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
    marginTop: 24,
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

export default SignupScreen;
