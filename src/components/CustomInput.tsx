import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, error, rightIcon, onRightIconPress, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null, rightIcon ? styles.inputWithIcon : null]}
          placeholderTextColor={colors.textLight}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.iconContainer} onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
    fontWeight: '600',
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputWithIcon: {
    paddingRight: 48,
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInput;
