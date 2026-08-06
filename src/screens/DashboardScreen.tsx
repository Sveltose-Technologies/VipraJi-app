import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import GlobalSearch from '../components/GlobalSearch';
import Icon from 'react-native-vector-icons/Feather';

const DashboardScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const renderSectionHeader = (title: string, iconName: string) => (
    <View style={styles.sectionHeader}>
      <Icon name={iconName} size={20} color={colors.primary} style={styles.sectionIcon} />
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.primaryDark }]}>{t('welcome', 'Namaste, Pandit Ji')}</Text>
        <Text style={[styles.dateText, { color: colors.textLight }]}>Tuesday, 24 October</Text>
      </View>

      <GlobalSearch />

      {/* Daily Spiritual Card */}
      <View style={[styles.spiritualCard, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
        <View style={styles.spiritualHeader}>
          <Icon name="sun" size={24} color={colors.primaryDark} />
          <Text style={[styles.spiritualTitle, { color: colors.primaryDark }]}>Daily Spiritual Card</Text>
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

      {/* Quick Stats Grid */}
      <View style={styles.widgetsGrid}>
        <View style={[styles.widgetBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.widgetLabel, { color: colors.textLight }]}>Tithi</Text>
          <Text style={[styles.widgetValueSmall, { color: colors.text }]}>Shukla Chaturthi</Text>
        </View>
        <View style={[styles.widgetBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.widgetLabel, { color: colors.textLight }]}>Rahu Kaal</Text>
          <Text style={[styles.widgetValueSmall, { color: colors.text }]}>15:00 - 16:30</Text>
        </View>
        <View style={[styles.widgetBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.widgetLabel, { color: colors.textLight }]}>Sunrise</Text>
          <Text style={[styles.widgetValueSmall, { color: colors.text }]}>06:14 AM</Text>
        </View>
        <View style={[styles.widgetBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.widgetLabel, { color: colors.textLight }]}>Subscription</Text>
          <Text style={[styles.widgetValueSmall, { color: '#10B981' }]}>Active (30 days)</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.secondary }]}>
        <Icon name="calendar" size={20} color={colors.surface} />
        <Text style={[styles.actionButtonText, { color: colors.surface }]}>View Today's Full Panchang</Text>
      </TouchableOpacity>

      {/* Today's Bookings & Tasks */}
      <View style={styles.listsContainer}>
        {renderSectionHeader('Today\'s Bookings', 'calendar')}
        <View style={[styles.listItem, { backgroundColor: colors.surface, borderLeftColor: colors.primary }]}>
          <View>
            <Text style={[styles.listItemTitle, { color: colors.text }]}>Ganesh Pooja</Text>
            <Text style={[styles.listItemSub, { color: colors.textLight }]}>Sharma Family • Andheri West</Text>
          </View>
          <Text style={[styles.listItemTime, { color: colors.primary }]}>10:00 AM</Text>
        </View>

        {renderSectionHeader('Today\'s Tasks', 'check-square')}
        <View style={[styles.listItem, { backgroundColor: colors.surface, borderLeftColor: colors.secondary }]}>
          <View>
            <Text style={[styles.listItemTitle, { color: colors.text }]}>Prepare Pooja Samagri</Text>
            <Text style={[styles.listItemSub, { color: colors.textLight }]}>For evening Satyanarayan Katha</Text>
          </View>
          <Icon name="circle" size={24} color={colors.border} />
        </View>

        {renderSectionHeader('Community Discussions', 'message-circle')}
        <View style={[styles.listItem, { backgroundColor: colors.surface }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.listItemTitle, { color: colors.text }]}>Best Muhurat for Griha Pravesh this month?</Text>
            <Text style={[styles.listItemSub, { color: colors.textLight }]}>12 Pandits replied • 1 hour ago</Text>
          </View>
          <Icon name="chevron-right" size={20} color={colors.textLight} />
        </View>
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
    marginTop: 8,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    marginTop: 4,
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
    fontSize: 20,
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
    fontSize: 15,
    lineHeight: 22,
  },
  widgetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  widgetBox: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  widgetLabel: {
    fontSize: 13,
    marginBottom: 6,
  },
  widgetValueSmall: {
    fontSize: 15,
    fontWeight: 'bold',
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
  },
});

export default DashboardScreen;
