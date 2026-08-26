import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import GlobalSearch from '../components/GlobalSearch';
import Icon from 'react-native-vector-icons/Feather';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../navigation/AppNavigator';
import CustomHeader from '../components/CustomHeader';

import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';
import AajKaKaamCard from '../components/AajKaKaamCard';
import PanchangWidget from '../components/PanchangWidget';
import { MOCK_AAJ_KA_KAAM, MOCK_MORNING_PANCHANG } from '../data/mockDashboard';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen = () => {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  const renderSectionHeader = (title: string, iconName: string) => (
    <View style={styles.sectionHeader}>
      <Icon name={iconName} size={20} color={colors.primary} style={styles.sectionIcon} />
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
    </View>
  );

  const handleAction = async (action: string) => {
    try {
      if (action === 'call') {
        await Linking.openURL(`tel:${MOCK_AAJ_KA_KAAM.phone}`);
      } else if (action === 'whatsapp') {
        const phone = MOCK_AAJ_KA_KAAM.phone.replace('+', '');
        const url = `https://wa.me/${phone}?text=Namaste`;
        await Linking.openURL(url);
      } else if (action === 'map') {
        const address = encodeURIComponent(MOCK_AAJ_KA_KAAM.address);
        await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not open the requested application.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        isHome={true}
        notificationCount={unreadCount}
        onNotificationPress={() => navigation.navigate('Notifications')}
        showThemeToggle={true}
      />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
        <View style={styles.welcomeContainer}>
          <Text style={[styles.greeting, { color: colors.text }]}>{t('welcome', 'Namaste, Pandit Ji')}</Text>
          <Text style={[styles.dateText, { color: colors.textLight }]}>Tuesday, 24 October</Text>
        </View>

        <GlobalSearch />

        {/* Quick Access Tools */}
        <View style={styles.quickAccessRow}>
          <TouchableOpacity
            style={[styles.quickAccessCard, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Panchang')}
            activeOpacity={0.8}
          >
            <View style={styles.quickAccessIconBgWhite}>
              <Icon name="sun" size={20} color={colors.primary} />
            </View>
            <View style={styles.quickAccessTextContainer}>
              <Text style={styles.quickAccessTitleWhite}>Panchang</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickAccessCard, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Kundali')}
            activeOpacity={0.8}
          >
            <View style={styles.quickAccessIconBgWhite}>
              <Icon name="star" size={20} color={colors.primary} />
            </View>
            <View style={styles.quickAccessTextContainer}>
              <Text style={styles.quickAccessTitleWhite}>Kundali</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 1. Aaj Ka Kaam Card - One Tap Daily Workspace */}
        <AajKaKaamCard data={MOCK_AAJ_KA_KAAM} onPressAction={handleAction} />

        {/* 2. Daily Spiritual Card */}
        <View style={[styles.spiritualCard, { backgroundColor: colors.aajkaBg, borderColor: colors.primary }]}>
          <View style={styles.spiritualHeader}>
            <Icon name="sun" size={24} color={colors.primary} />
            <Text style={[styles.spiritualTitle, { color: colors.primary }]}>{t('home.spiritual_card', 'Daily Spiritual Card')}</Text>
          </View>
          <View style={styles.spiritualItem}>
            <Text style={[styles.spiritualLabel, { color: colors.text }]}>Today's Thought:</Text>
            <Text style={[styles.spiritualValue, { color: colors.textLight }]}>Inner peace begins when you choose not to allow another person or event to control your emotions.</Text>
          </View>
          <View style={styles.spiritualItem}>
            <Text style={[styles.spiritualLabel, { color: colors.text }]}>Today's Mantra:</Text>
            <Text style={[styles.spiritualValue, { color: colors.textLight }]}>Om Gam Ganapataye Namaha</Text>
          </View>
          <View style={styles.spiritualItem}>
            <Text style={[styles.spiritualLabel, { color: colors.text }]}>Today's Festival:</Text>
            <Text style={[styles.spiritualValue, { color: colors.textLight }]}>Ganesh Chaturthi</Text>
          </View>
          <View style={styles.spiritualItem}>
            <Text style={[styles.spiritualLabel, { color: colors.text }]}>Inspirational Quote:</Text>
            <Text style={[styles.spiritualValue, { color: colors.textLight, fontStyle: 'italic' }]}>"The soul is neither born, and nor does it die" - Bhagavad Gita</Text>
          </View>
        </View>

        {/* 3. Morning Daily Dashboard Widgets */}
        <PanchangWidget data={MOCK_MORNING_PANCHANG} />

        {/* Quick Link to Calendar */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Icon name="calendar" size={20} color={colors.surface} />
          <Text style={[styles.actionButtonText, { color: colors.surface }]}>View Full Calendar</Text>
        </TouchableOpacity>

        {/* 4. Today's Bookings & Tasks */}
        <View style={styles.listsContainer}>
          {renderSectionHeader(t('home.todays_bookings', 'Today\'s Bookings'), 'calendar')}
          <View style={[styles.listItem, { backgroundColor: colors.surface, borderLeftColor: colors.secondary }]}>
            <View>
              <Text style={[styles.listItemTitle, { color: colors.text }]}>Ganesh Pooja</Text>
              <Text style={[styles.listItemSub, { color: colors.textLight }]}>Sharma Family • Andheri West</Text>
            </View>
            <Text style={[styles.listItemTime, { color: colors.secondary }]}>10:00 AM</Text>
          </View>

          {renderSectionHeader(t('home.todays_tasks', 'Today\'s Tasks'), 'check-square')}
          <View style={[styles.listItem, { backgroundColor: colors.surface, borderLeftColor: colors.accent }]}>
            <View>
              <Text style={[styles.listItemTitle, { color: colors.text }]}>Prepare Pooja Samagri</Text>
              <Text style={[styles.listItemSub, { color: colors.textLight }]}>For evening Satyanarayan Katha</Text>
            </View>
            <Icon name="circle" size={24} color={colors.border} />
          </View>

          {/* Subscription Status at the bottom */}
          {renderSectionHeader('Subscription Status', 'award')}
          <View style={[styles.listItem, { backgroundColor: colors.surface, borderLeftColor: colors.success }]}>
            <View>
              <Text style={[styles.listItemTitle, { color: colors.text }]}>Premium Plan Active</Text>
              <Text style={[styles.listItemSub, { color: colors.textLight }]}>30 days remaining</Text>
            </View>
            <Icon name="check-circle" size={24} color={colors.success} />
          </View>

          {renderSectionHeader(t('home.community_discussions', 'Community Discussions'), 'message-circle')}
          <TouchableOpacity
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('Community')}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.listItemTitle, { color: colors.text }]}>Best Muhurat for Griha Pravesh this month?</Text>
              <Text style={[styles.listItemSub, { color: colors.textLight }]}>12 Pandits replied • 1 hour ago</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
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
  content: {
    padding: 10,
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 13,
    marginTop: 4,
  },
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAccessCard: {
    flex: 1,
    flexDirection: 'row',
    padding: 7,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  quickAccessIconBgWhite: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickAccessTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  quickAccessTitleWhite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  spiritualCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  spiritualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  spiritualTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  spiritualItem: {
    marginBottom: 12,
  },
  spiritualLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  spiritualValue: {
    fontSize: 14,
    lineHeight: 22,
  },
  actionButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listsContainer: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  listItemSub: {
    fontSize: 14,
  },
  listItemTime: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default HomeScreen;
