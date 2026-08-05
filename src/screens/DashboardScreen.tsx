import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Namaste, Pandit Ji</Text>
      </View>

      {/* Daily Spiritual Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Spiritual Card</Text>
        <Text style={styles.cardText}>Thought: Inner peace begins the moment you choose not to allow another person or event to control your emotions.</Text>
        <Text style={styles.cardText}>Mantra: Om Namah Shivaya</Text>
        <Text style={styles.cardText}>Festival: Ganesh Chaturthi (Upcoming)</Text>
      </View>

      {/* Dashboard Widgets */}
      <View style={styles.widgetsGrid}>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Tithi</Text>
          <Text style={styles.widgetValue}>Shukla Paksha</Text>
        </View>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Rahu Kaal</Text>
          <Text style={styles.widgetValue}>10:30 - 12:00</Text>
        </View>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Sunrise</Text>
          <Text style={styles.widgetValue}>06:15 AM</Text>
        </View>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Bookings</Text>
          <Text style={styles.widgetValue}>3 Today</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.panchangButton}>
        <Text style={styles.panchangButtonText}>View Today's Panchang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  widgetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  widget: {
    backgroundColor: colors.surface,
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
  },
  widgetTitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  widgetValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  panchangButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  panchangButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
