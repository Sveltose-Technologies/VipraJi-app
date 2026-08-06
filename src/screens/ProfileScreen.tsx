import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const ProfileScreen = () => {

  const { colors } = useTheme();
  // Profile Form State
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    mobileNumber: '',
    email: '',
    experience: '',
    specialisations: '',
    city: '',
    address: '',
    whatsappNumber: '',
    pdfFooterText: '',
  });

  const [images, setImages] = useState({
    profilePhoto: '',
    personalLogo: '',
    signature: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async (field: keyof typeof images) => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets.length > 0) {
      setImages(prev => ({ ...prev, [field]: result.assets![0].uri || '' }));
    }
  };

  const handleSaveProfile = () => {
    // Mock save
    Toast.show({ type: 'success', text1: 'Profile Saved!' });
  };

  const renderImagePicker = (label: string, field: keyof typeof images) => (
    <View style={styles.imagePickerContainer}>
      <Text style={[styles.imageLabel, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity 
        style={[styles.imageBox, { borderColor: colors.border, backgroundColor: colors.inputBg }]} 
        onPress={() => pickImage(field)}
      >
        {images[field] ? (
          <Image source={{ uri: images[field] }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="camera" size={24} color={colors.textLight} />
            <Text style={[styles.imagePlaceholderText, { color: colors.textLight }]}>Tap to upload</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Profile Info Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Professional Profile</Text>
          <CustomInput label="Full Name" placeholder="Enter your full name" value={formData.fullName} onChangeText={(v) => updateField('fullName', v)} />
          <CustomInput label="Display Name" placeholder="Name shown to clients" value={formData.displayName} onChangeText={(v) => updateField('displayName', v)} />
          <CustomInput label="Mobile Number" placeholder="e.g. 9876543210" keyboardType="phone-pad" value={formData.mobileNumber} onChangeText={(v) => updateField('mobileNumber', v)} />
          <CustomInput label="Email Address" placeholder="e.g. pandit@example.com" keyboardType="email-address" autoCapitalize="none" value={formData.email} onChangeText={(v) => updateField('email', v)} />
          <CustomInput label="WhatsApp Number" placeholder="e.g. 9876543210" keyboardType="phone-pad" value={formData.whatsappNumber} onChangeText={(v) => updateField('whatsappNumber', v)} />
          <CustomInput label="Years of Experience" placeholder="e.g. 15 Years" value={formData.experience} onChangeText={(v) => updateField('experience', v)} />
          <CustomInput label="Specialisations" placeholder="e.g. Vastu, Astrology, Vivah" value={formData.specialisations} onChangeText={(v) => updateField('specialisations', v)} />
          <CustomInput label="City" placeholder="e.g. Mumbai" value={formData.city} onChangeText={(v) => updateField('city', v)} />
          <CustomInput label="Full Address" placeholder="Your complete address" value={formData.address} onChangeText={(v) => updateField('address', v)} multiline style={[styles.textArea, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]} />
        </View>

        {/* Branding Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Branding & Assets</Text>
          {renderImagePicker('Profile Photo', 'profilePhoto')}
          {renderImagePicker('Personal Logo', 'personalLogo')}
          {renderImagePicker('Signature', 'signature')}
          
          <CustomInput label="PDF Footer Text" placeholder="Text for invoices and reports" value={formData.pdfFooterText} onChangeText={(v) => updateField('pdfFooterText', v)} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <CustomButton title="Save Profile" onPress={handleSaveProfile} />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  imagePickerContainer: {
    marginBottom: 16,
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  imageBox: {
    height: 120,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default ProfileScreen;

