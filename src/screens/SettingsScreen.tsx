import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const SettingsScreen = () => {
  const { theme, setTheme, colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();

  const changeLanguage = async (lang: string) => {
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('language_preference', lang);
  };

  const renderOption = (label: string, isSelected: boolean, onPress: () => void) => (
    <TouchableOpacity 
      style={[styles.optionButton, { borderColor: isSelected ? colors.primary : colors.border }]} 
      onPress={onPress}
    >
      <Text style={[styles.optionText, { color: isSelected ? colors.primary : colors.text }]}>{label}</Text>
      {isSelected && <Icon name="check" size={20} color={colors.primary} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: 40 }}>
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        {renderOption('System Default', theme === 'system', () => setTheme('system'))}
        {renderOption('Light Mode', theme === 'light', () => setTheme('light'))}
        {renderOption('Dark Mode', theme === 'dark', () => setTheme('dark'))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Language</Text>
        {renderOption('English', i18n.language === 'en', () => changeLanguage('en'))}
        {renderOption('हिंदी (Hindi)', i18n.language === 'hi', () => changeLanguage('hi'))}
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
        <CustomButton title="Logout" onPress={logout} />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  }
});

export default SettingsScreen;
