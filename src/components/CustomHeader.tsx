import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  title?: string;
  icon?: string;
  isHome?: boolean;
  notificationCount?: number;
  onNotificationPress?: () => void;
  showBack?: boolean;
  showThemeToggle?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  icon,
  isHome,
  notificationCount = 0,
  onNotificationPress,
  showBack = false,
  showThemeToggle = false,
}) => {
  const { colors, isDark, setTheme } = useTheme();
  const navigation = useNavigation();
  
  // Use a bright vibrant color for icons in dark mode for better visibility
  const iconColor = isDark ? colors.primary : '#FFF';
  const textColor = '#FFF'; // Keep text white for high contrast on dark headers

  const insets = useSafeAreaInsets();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={{ backgroundColor: colors.darkHeader, paddingTop: insets.top }}>
      <StatusBar backgroundColor={colors.darkHeader} barStyle="light-content" translucent={true} />
      <View style={[styles.container, { backgroundColor: colors.darkHeader }]}>
        {isHome ? (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={[styles.logoText, { color: textColor }]}>Vipra Sathi</Text>
          </View>
        ) : (
          <View style={styles.titleContainer}>
            {showBack && (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-left" size={24} color={textColor} />
              </TouchableOpacity>
            )}
            {icon && !showBack && <Icon name={icon} size={22} color={iconColor} style={styles.icon} />}
            <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
          </View>
        )}

        <View style={styles.rightActions}>
          {showThemeToggle && (
            <TouchableOpacity style={styles.iconBtn} onPress={toggleTheme}>
              <Icon name={isDark ? "sun" : "moon"} size={20} color={iconColor} />
            </TouchableOpacity>
          )}
          
          {isHome && (
            <TouchableOpacity style={styles.iconBtn} onPress={onNotificationPress}>
              <Icon name="bell" size={20} color={iconColor} />
              {notificationCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 28,
    height: 28,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  icon: {
    marginRight: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    flexShrink: 1,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginLeft: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#DC2626',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
