import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/Feather';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Kundali'>;

const KundaliScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const [brideDetails, setBrideDetails] = useState({
    name: '',
    dob: '',
    tob: '',
    place: ''
  });

  const [groomDetails, setGroomDetails] = useState({
    name: '',
    dob: '',
    tob: '',
    place: ''
  });

  const renderInput = (
    label: string, 
    value: string, 
    onChangeText: (text: string) => void, 
    placeholder: string
  ) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: colors.textLight }]}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          { 
            backgroundColor: colors.surface, 
            borderColor: colors.border, 
            color: colors.text 
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight + '80'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <CustomHeader title="Kundali Matching" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Bride Details Section */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Icon name="user" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Bride Details</Text>
          </View>
          
          {renderInput('Name', brideDetails.name, (text) => setBrideDetails({...brideDetails, name: text}), 'Enter Bride Name')}
          {renderInput('Date of Birth', brideDetails.dob, (text) => setBrideDetails({...brideDetails, dob: text}), 'DD/MM/YYYY')}
          {renderInput('Time of Birth', brideDetails.tob, (text) => setBrideDetails({...brideDetails, tob: text}), 'HH:MM AM/PM')}
          {renderInput('Place of Birth', brideDetails.place, (text) => setBrideDetails({...brideDetails, place: text}), 'City, State')}
        </View>

        {/* Groom Details Section */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Icon name="user" size={20} color={colors.secondary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Groom Details</Text>
          </View>
          
          {renderInput('Name', groomDetails.name, (text) => setGroomDetails({...groomDetails, name: text}), 'Enter Groom Name')}
          {renderInput('Date of Birth', groomDetails.dob, (text) => setGroomDetails({...groomDetails, dob: text}), 'DD/MM/YYYY')}
          {renderInput('Time of Birth', groomDetails.tob, (text) => setGroomDetails({...groomDetails, tob: text}), 'HH:MM AM/PM')}
          {renderInput('Place of Birth', groomDetails.place, (text) => setGroomDetails({...groomDetails, place: text}), 'City, State')}
        </View>

        <TouchableOpacity 
          style={[styles.matchBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('KundaliMatchingResult')}
        >
          <Text style={styles.matchBtnText}>Match Kundali</Text>
          <Icon name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  matchBtn: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  matchBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default KundaliScreen;
