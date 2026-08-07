import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import { CalendarEvent, EventStatus } from '../types/calendar';
import { generateMockCalendarEvents } from '../data/mockCalendar';
import EventModal from '../components/EventModal';

const STATUS_COLORS: Record<EventStatus, string> = {
  upcoming: '#16A34A',   // Emerald Green
  completed: '#2563EB',  // Royal Blue
  cancelled: '#DC2626',  // Red
  festival: '#F59E0B',   // Orange
};

const CalendarScreen = () => {
  const { colors, isDark } = useTheme();
  const [events, setEvents] = useState<CalendarEvent[]>(generateMockCalendarEvents());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState<string>(new Date().toISOString().split('T')[0].substring(0, 7));
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Filter events for selected date
  const selectedEvents = events.filter(e => e.date === selectedDate);

  // Generate marked dates for the calendar
  const markedDates = useMemo(() => {
    const marked: Record<string, any> = {};
    
    events.forEach(event => {
      if (!marked[event.date]) {
        marked[event.date] = { dots: [] };
      }
      marked[event.date].dots.push({
        key: event.id,
        color: STATUS_COLORS[event.status],
      });
    });

    // Mark the selected date
    if (marked[selectedDate]) {
      marked[selectedDate] = { ...marked[selectedDate], selected: true, selectedColor: colors.primary + '40' };
    } else {
      marked[selectedDate] = { selected: true, selectedColor: colors.primary + '40' };
    }

    return marked;
  }, [events, selectedDate, colors]);

  // Calculate monthly stats
  const monthlyStats = useMemo(() => {
    const monthEvents = events.filter(e => e.date.startsWith(currentMonth));
    const totalBookings = monthEvents.length;
    const busyDays = new Set(monthEvents.map(e => e.date)).size;
    // Assuming a 30-day month for simplicity of "Free Days" calculation here
    const daysInMonth = new Date(parseInt(currentMonth.split('-')[0]), parseInt(currentMonth.split('-')[1]), 0).getDate();
    const freeDays = daysInMonth - busyDays;
    
    return { totalBookings, busyDays, freeDays };
  }, [events, currentMonth]);

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...eventData } : e));
    } else {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setModalVisible(true);
  };

  const openEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Calendar Grid */}
        <Calendar
          current={selectedDate}
          onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
          onMonthChange={(month: DateData) => setCurrentMonth(month.dateString.substring(0, 7))}
          markingType={'multi-dot'}
          markedDates={markedDates}
          theme={{
            calendarBackground: colors.surface,
            textSectionTitleColor: colors.textLight,
            dayTextColor: colors.text,
            todayTextColor: colors.primary,
            selectedDayTextColor: colors.text,
            monthTextColor: colors.text,
            arrowColor: colors.primary,
          }}
          style={styles.calendar}
        />

        {/* Monthly Summary */}
        <View style={styles.summaryContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Monthly Summary</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{monthlyStats.totalBookings}</Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>Total Events</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: '#DC2626' }]}>{monthlyStats.busyDays}</Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>Busy Days</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: '#16A34A' }]}>{monthlyStats.freeDays}</Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>Free Days</Text>
            </View>
          </View>
        </View>

        {/* Agenda */}
        <View style={styles.agendaContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Agenda for {selectedDate}
          </Text>
          
          {selectedEvents.length === 0 ? (
            <Text style={[styles.noEventsText, { color: colors.textLight }]}>
              No events scheduled for this day.
            </Text>
          ) : (
            selectedEvents.map(event => (
              <TouchableOpacity
                key={event.id}
                style={[styles.eventCard, { backgroundColor: colors.surface, borderLeftColor: STATUS_COLORS[event.status] }]}
                onPress={() => openEditModal(event)}
              >
                <View style={styles.eventHeader}>
                  <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
                  <Text style={[styles.eventTime, { color: colors.textLight }]}>{event.time}</Text>
                </View>
                <View style={styles.eventFooter}>
                  <Text style={[styles.eventType, { color: colors.textLight }]}>
                    {event.type.toUpperCase()}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[event.status] + '20' }]}>
                    <Text style={[styles.statusText, { color: STATUS_COLORS[event.status] }]}>
                      {event.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                {event.description && (
                  <Text style={[styles.eventDesc, { color: colors.textLight }]} numberOfLines={2}>
                    {event.description}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
        
        {/* Padding for FAB */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={openAddModal}
      >
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Event Modal */}
      <EventModal
        visible={modalVisible}
        selectedDate={selectedDate}
        initialData={editingEvent}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  calendar: {
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  agendaContainer: {
    paddingHorizontal: 16,
  },
  noEventsText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  eventCard: {
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  eventTime: {
    fontSize: 14,
    fontWeight: '500',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  eventDesc: {
    fontSize: 14,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  }
});

export default CalendarScreen;
