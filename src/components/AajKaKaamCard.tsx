import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import { AajKaKaam } from '../data/mockDashboard';

interface Props {
  data: AajKaKaam;
  onPressAction: (action: string) => void;
}

const AajKaKaamCard: React.FC<Props> = ({ data, onPressAction }) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Icon name="sun" size={20} color="#FFF" />
          <Text style={[styles.headerTitle, { color: '#FFF' }]}>Aaj Ka Kaam</Text>
        </View>
        <View style={[styles.timeBadge, { backgroundColor: '#FFF' }]}>
          <Icon name="clock" size={14} color={colors.primary} />
          <Text style={[styles.timeText, { color: colors.primary }]}>{data.time}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Text style={[styles.poojaName, { color: '#FFF' }]}>{data.poojaName}</Text>
        <Text style={[styles.separator, { color: 'rgba(255,255,255,0.6)' }]}>•</Text>
        <Text style={[styles.yajmanName, { color: 'rgba(255,255,255,0.9)' }]}>{data.yajmanName}</Text>
      </View>

      <View style={[styles.metaData, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
        <View style={styles.metaRow}>
          <Icon name="map-pin" size={14} color="rgba(255,255,255,0.9)" />
          <Text style={[styles.metaText, { color: "rgba(255,255,255,0.9)" }]} numberOfLines={1}>{data.address}</Text>
        </View>
        <View style={styles.metaRow}>
          <Icon name="credit-card" size={14} color="rgba(255,255,255,0.9)" />
          <Text style={[styles.metaText, { color: "rgba(255,255,255,0.9)" }]}>
            Dakshina: {data.dakshinaAmount} ({data.dakshinaStatus})
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Icon name="info" size={14} color="rgba(255,255,255,0.9)" />
          <Text style={[styles.metaText, { color: "rgba(255,255,255,0.9)" }]} numberOfLines={2}>
            Note: {data.notes}
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionsScroll}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFF' }]} onPress={() => onPressAction('call')}>
          <Icon name="phone" size={16} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#25D366' }]} onPress={() => onPressAction('whatsapp')}>
          <Icon name="message-circle" size={16} color="#FFF" />
          <Text style={[styles.actionText, { color: '#FFF' }]}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFF' }]} onPress={() => onPressAction('directions')}>
          <Icon name="navigation" size={16} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>Directions</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  poojaName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginHorizontal: 8,
    fontSize: 20,
  },
  yajmanName: {
    fontSize: 18,
    fontWeight: '600',
  },
  metaData: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  actionsScroll: {
    flexDirection: 'row',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 8,
  },
  actionText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default AajKaKaamCard;
