import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../components/CustomHeader';

const DakshinaCalculatorScreen = () => {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();

  const [days, setDays] = useState('');
  const [acharyaPerDay, setAcharyaPerDay] = useState('');
  const [panditPerDay, setPanditPerDay] = useState('');
  const [samagriAmount, setSamagriAmount] = useState('');
  const [transportAmount, setTransportAmount] = useState('');

  const A = parseFloat(days) || 0;
  const B = parseFloat(acharyaPerDay) || 0;
  const C = parseFloat(panditPerDay) || 0;
  const D = parseFloat(samagriAmount) || 0;
  const E = parseFloat(transportAmount) || 0;

  const acharyaTotal = A * B;
  const panditTotal = A * C;
  const finalAmount = acharyaTotal + panditTotal;
  const totalAmount = finalAmount + D + E;

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    icon: string,
    placeholder: string,
    optional: boolean = false
  ) => (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {optional && <Text style={[styles.optionalBadge, { color: colors.textLight }]}>{t('dakshina_calc.optional', 'Optional')}</Text>}
      </View>
      <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Icon name={icon} size={18} color={colors.primary} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={t('dakshina_calc.title', 'Dakshina Calculator')} icon="dollar-sign" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          style={[styles.container, { backgroundColor: colors.background }]} 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.subtitle, { color: colors.textLight }]}>
              {t('dakshina_calc.subtitle', 'Easily calculate your pooja dakshina including acharya, pandit, and additional expenses.')}
            </Text>
          </View>

        <View style={styles.section}>
          {renderInput(t('dakshina_calc.days', 'Total Pooja Days'), days, setDays, 'calendar', t('dakshina_calc.days_placeholder', 'e.g., 3'))}
          {renderInput(t('dakshina_calc.acharya_amt', 'Acharya Per Day Amount'), acharyaPerDay, setAcharyaPerDay, 'user', t('dakshina_calc.acharya_placeholder', 'e.g., 2100'))}
          {renderInput(t('dakshina_calc.pandit_amt', 'Pandit Per Day Amount'), panditPerDay, setPanditPerDay, 'users', t('dakshina_calc.pandit_placeholder', 'e.g., 1100'))}
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <View style={styles.section}>
          {renderInput(t('dakshina_calc.samagri_amt', 'Samagri Amount'), samagriAmount, setSamagriAmount, 'shopping-bag', t('dakshina_calc.samagri_placeholder', 'e.g., 5000'), true)}
          {renderInput(t('dakshina_calc.transport_amt', 'Transportation Amount'), transportAmount, setTransportAmount, 'truck', t('dakshina_calc.transport_placeholder', 'e.g., 1000'), true)}
        </View>

        <View style={[styles.resultCard, { backgroundColor: colors.primary, shadowColor: colors.primary }]}>
          <View style={styles.resultHeader}>
            <Icon name="file-text" size={20} color="#FFF" />
            <Text style={styles.resultTitle}>{t('dakshina_calc.summary', 'Calculation Summary')}</Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>{t('dakshina_calc.acharya_total', 'Acharya Total (Days × Amt)')}</Text>
            <Text style={styles.resultValue}>₹{acharyaTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>{t('dakshina_calc.pandit_total', 'Pandit Total (Days × Amt)')}</Text>
            <Text style={styles.resultValue}>₹{panditTotal.toFixed(2)}</Text>
          </View>
          <View style={[styles.resultRow, styles.resultRowHighlight]}>
            <Text style={styles.resultLabelBold}>{t('dakshina_calc.pooja_final', 'Pooja Final Amount')}</Text>
            <Text style={styles.resultValueBold}>₹{finalAmount.toFixed(2)}</Text>
          </View>

          {(D > 0 || E > 0) && (
            <>
              {D > 0 && (
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{t('dakshina_calc.samagri', 'Samagri')}</Text>
                  <Text style={styles.resultValue}>+ ₹{D.toFixed(2)}</Text>
                </View>
              )}
              {E > 0 && (
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{t('dakshina_calc.transportation', 'Transportation')}</Text>
                  <Text style={styles.resultValue}>+ ₹{E.toFixed(2)}</Text>
                </View>
              )}
            </>
          )}

          <View style={styles.grandTotalContainer}>
            <Text style={styles.grandTotalLabel}>{t('dakshina_calc.grand_total', 'Grand Total')}</Text>
            <Text style={styles.grandTotalValue}>₹{totalAmount.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 4,
  },
  divider: {
    height: 1,
    marginVertical: 12,
    opacity: 0.3,
  },
  inputContainer: {
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  optionalBadge: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  resultCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultRowHighlight: {
    marginTop: 4,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  resultLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  resultValue: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
  },
  resultLabelBold: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultValueBold: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  grandTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 14,
    borderRadius: 10,
  },
  grandTotalLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DakshinaCalculatorScreen;
