import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import { CalendarEvent, EventType, EventStatus } from '../types/calendar';

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (id: string) => void;
  initialData?: CalendarEvent | null;
  selectedDate: string;
}

const EventModal: React.FC<EventModalProps> = ({ 
  visible, 
  onClose, 
  onSave, 
  onDelete,
  initialData, 
  selectedDate 
}) => {
  const { colors, isDark } = useTheme();
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EventType>('pooja');
  const [status, setStatus] = useState<EventStatus>('upcoming');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setType(initialData.type);
      setStatus(initialData.status);
      setTime(initialData.time || '');
      setDescription(initialData.description || '');
    } else {
      resetForm();
    }
  }, [initialData, visible]);

  const resetForm = () => {
    setTitle('');
    setType('pooja');
    setStatus('upcoming');
    setTime('');
    setDescription('');
  };

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      date: initialData?.date || selectedDate,
      type,
      status,
      time: time.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onClose} style={styles.iconButton}>
            <Icon name="x" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {initialData ? 'Edit Event' : 'Add Event'}
          </Text>
          <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
            <Icon name="check" size={24} color={title.trim() ? colors.primary : colors.textLight} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Title Input */}
          <Text style={[styles.label, { color: colors.text }]}>Title</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
            placeholder="Event Title..."
            placeholderTextColor={colors.textLight}
            value={title}
            onChangeText={setTitle}
          />

          {/* Time Input */}
          <Text style={[styles.label, { color: colors.text }]}>Time</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
            placeholder="e.g. 10:30 AM"
            placeholderTextColor={colors.textLight}
            value={time}
            onChangeText={setTime}
          />

          {/* Event Type Selector */}
          <Text style={[styles.label, { color: colors.text }]}>Event Type</Text>
          <View style={styles.segmentedControl}>
            {(['pooja', 'task', 'festival'] as EventType[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.segmentButton,
                  type === t && { backgroundColor: colors.primary },
                  { borderColor: colors.border }
                ]}
                onPress={() => setType(t)}
              >
                <Text style={[
                  styles.segmentText,
                  { color: type === t ? '#FFF' : colors.text }
                ]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Status Selector */}
          <Text style={[styles.label, { color: colors.text }]}>Status</Text>
          <View style={styles.segmentedControl}>
            {(['upcoming', 'completed', 'cancelled'] as EventStatus[]).map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.segmentButton,
                  status === s && { backgroundColor: colors.primary },
                  { borderColor: colors.border }
                ]}
                onPress={() => setStatus(s)}
              >
                <Text style={[
                  styles.segmentText,
                  { color: status === s ? '#FFF' : colors.text }
                ]}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Description Input */}
          <Text style={[styles.label, { color: colors.text }]}>Description / Notes</Text>
          <TextInput
            style={[styles.textArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
            placeholder="Additional details..."
            placeholderTextColor={colors.textLight}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Delete Button (Only if editing) */}
          {initialData && onDelete && (
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => {
                onDelete(initialData.id);
                onClose();
              }}
            >
              <Icon name="trash-2" size={20} color="#DC2626" />
              <Text style={styles.deleteText}>Delete Event</Text>
            </TouchableOpacity>
          )}

        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  iconButton: { padding: 4 },
  content: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
  },
  segmentText: { fontSize: 14, fontWeight: '500' },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#DC262615',
  },
  deleteText: {
    color: '#DC2626',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  }
});

export default EventModal;
