import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MenuScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const menuItems = [
    { title: 'Profile & Branding', icon: 'user', screen: 'Profile' },
    { title: 'Dakshina Calculator', icon: 'calculator', screen: 'DakshinaCalculator' },
    { title: 'Subscription & Wallet', icon: 'credit-card', screen: 'Subscription' },
    { title: 'Work History', icon: 'clock', screen: 'History' },
    { title: 'Help Center', icon: 'help-circle', screen: 'HelpCenter' },
    { title: 'Settings', icon: 'settings', screen: 'Settings' },
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.primaryDark }]}>Menu</Text>
      </View>
      
      <View style={[styles.menuContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {menuItems.map(renderMenuItem)}
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: '500',
  }
});

export default MenuScreen;
