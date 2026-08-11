import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../components/CustomHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MenuScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const menuItems = [
    { title: t('menu.profile', 'Profile & Branding'), icon: 'user', screen: 'Profile' },
    { title: t('menu.community', 'Community'), icon: 'users', screen: 'Community' },
    { title: t('menu.subscription', 'Subscription & Wallet'), icon: 'credit-card', screen: 'Subscription' },
    { title: t('menu.history', 'Work History'), icon: 'clock', screen: 'History' },
    { title: t('menu.help', 'Help Center'), icon: 'help-circle', screen: 'HelpCenter' },
    { title: t('menu.settings', 'Settings'), icon: 'settings', screen: 'Settings' },
  ];

  const renderMenuItem = ({ title, icon, screen }: any) => (
    <TouchableOpacity
      key={screen}
      style={[styles.menuItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
      onPress={() => navigation.navigate(screen)}
    >
      <View style={styles.menuLeft}>
        <Icon name={icon} size={22} color={colors.primary} style={styles.menuIcon} />
        <Text style={[styles.menuTitle, { color: colors.text }]}>{title}</Text>
      </View>
      <Icon name="chevron-right" size={20} color={colors.textLight} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={t('menu.title', 'Menu')} icon="grid" />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.menuContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
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
  menuContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
  }
});

export default MenuScreen;
