import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../context/AuthContext';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

const AnimatedOption = ({ label, isSelected, onPress, iconName, colors }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.animatedOption,
          {
            backgroundColor: isSelected ? colors.primary + '15' : 'transparent',
            borderColor: isSelected ? colors.primary : colors.border,
            transform: [{ scale: scaleValue }]
          }
        ]}
      >
        <View style={styles.optionLeft}>
          <View style={[styles.iconContainer, { backgroundColor: isSelected ? colors.primary : colors.surface }]}>
            <Icon name={iconName} size={20} color={isSelected ? '#FFF' : colors.textLight} />
          </View>
          <Text style={[styles.optionText, { color: isSelected ? colors.primaryDark : colors.text }]}>
            {label}
          </Text>
        </View>

        {isSelected && (
          <Animated.View style={styles.checkBadge}>
            <Icon name="check-circle" size={24} color={colors.primary} />
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const SettingsAccordion = ({ title, icon, isExpanded, onToggle, children, colors }: any) => {
  const arrowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(arrowAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const spin = arrowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <View style={[styles.accordionContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <View style={styles.accordionHeaderLeft}>
          <View style={[styles.headerIconWrapper, { backgroundColor: colors.primary + '20' }]}>
            <Icon name={icon} size={22} color={colors.primary} />
          </View>
          <Text style={[styles.accordionTitle, { color: colors.text }]}>{title}</Text>
        </View>

        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Icon name="chevron-down" size={24} color={colors.textLight} />
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={[styles.accordionBody, { borderTopColor: colors.border }]}>
          {children}
        </View>
      )}
    </View>
  );
};

const SettingsScreen = () => {
  const { theme, setTheme, colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { logout, isGuest, exitGuestToLogin } = useAuth();

  const [expandedSection, setExpandedSection] = useState<string | null>('appearance');

  const toggleSection = (section: string) => {
    LayoutAnimation.configureNext({
      duration: 150,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'easeInEaseOut' },
      delete: { type: 'easeInEaseOut', property: 'opacity' },
    });
    setExpandedSection(expandedSection === section ? null : section);
  };

  const changeLanguage = async (lang: string) => {
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('language_preference', lang);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t('menu.settings', 'Settings')}</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textLight }]}>
          Customize your experience
        </Text>
      </View>

      <SettingsAccordion
        title="Appearance"
        icon="layout"
        isExpanded={expandedSection === 'appearance'}
        onToggle={() => toggleSection('appearance')}
        colors={colors}
      >
        <AnimatedOption
          label="System Default"
          iconName="smartphone"
          isSelected={theme === 'system'}
          onPress={() => setTheme('system')}
          colors={colors}
        />
        <AnimatedOption
          label="Light Mode"
          iconName="sun"
          isSelected={theme === 'light'}
          onPress={() => setTheme('light')}
          colors={colors}
        />
        <AnimatedOption
          label="Dark Mode"
          iconName="moon"
          isSelected={theme === 'dark'}
          onPress={() => setTheme('dark')}
          colors={colors}
        />
      </SettingsAccordion>

      <SettingsAccordion
        title="Language"
        icon="globe"
        isExpanded={expandedSection === 'language'}
        onToggle={() => toggleSection('language')}
        colors={colors}
      >
        <AnimatedOption
          label="English"
          iconName="type"
          isSelected={i18n.language === 'en'}
          onPress={() => changeLanguage('en')}
          colors={colors}
        />
        <AnimatedOption
          label="Hindi"
          iconName="type"
          isSelected={i18n.language === 'hi'}
          onPress={() => changeLanguage('hi')}
          colors={colors}
        />
      </SettingsAccordion>

      {isGuest ? (
        <View style={[styles.guestCTAContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* <Text style={[styles.guestCTASubtitle, { color: colors.textLight }]}>
            Join VipraJi to unlock personalized daily panchang, history, and community features.
          </Text> */}
          <TouchableOpacity
            style={[styles.loginCTAButton, { backgroundColor: colors.primary }]}
            onPress={exitGuestToLogin}
            activeOpacity={0.85}
          >
            <Icon name="user-plus" size={22} color="#FFFFFF" />
            <Text style={styles.loginCTAText}>Create Account / Log In</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' }]}
          onPress={logout}
          activeOpacity={0.8}
        >
          <Icon name="log-out" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={[styles.versionText, { color: colors.textLight }]}>VipraJi App v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  accordionContainer: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accordionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  animatedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1.5,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
  },
  checkBadge: {
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  guestCTAContainer: {
    marginTop: 24,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  guestCTASubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  loginCTAButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  loginCTAText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
  }
});

export default SettingsScreen;
