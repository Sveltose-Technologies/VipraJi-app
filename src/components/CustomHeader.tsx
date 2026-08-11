import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../theme/ThemeContext';

interface CustomHeaderProps {
  title?: string;
  icon?: string;
  isHome?: boolean;
  notificationCount?: number;
  onNotificationPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  icon,
  isHome,
  notificationCount = 0,
  onNotificationPress,
}) => {
  const { colors, isDark } = useTheme();
  
  // Use a bright vibrant color for icons in dark mode for better visibility
  const iconColor = isDark ? colors.primary : '#FFF';
  const textColor = '#FFF'; // Keep text white for high contrast on dark headers

  return (
    <View style={{ backgroundColor: colors.darkHeader }}>
      <StatusBar backgroundColor={colors.darkHeader} barStyle="light-content" />
      <View style={[styles.container, { backgroundColor: colors.darkHeader }]}>
        {isHome ? (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={[styles.logoText, { color: textColor }]}>VipraJi</Text>
          </View>
        ) : (
          <View style={styles.titleContainer}>
            {icon && <Icon name={icon} size={22} color={iconColor} style={styles.icon} />}
            <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
          </View>
        )}

        {isHome && (
          <TouchableOpacity style={styles.notificationBtn} onPress={onNotificationPress}>
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
  },
  icon: {
    marginRight: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  notificationBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
