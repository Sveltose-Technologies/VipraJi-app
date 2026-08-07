import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { MOCK_STOTRAS } from '../data/mockLibrary';
import AudioPlayerUI from '../components/AudioPlayerUI';

type StotramDetailRouteProp = {
  key: string;
  name: 'StotramDetail';
  params: { stotramId: string };
};

const StotramDetailScreen = () => {
  const route = useRoute<StotramDetailRouteProp>();
  const { stotramId } = route.params;
  const { colors } = useTheme();
  
  const stotram = MOCK_STOTRAS.find(s => s.id === stotramId);

  if (!stotram) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Stotram not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.primaryDark }]}>{stotram.title}</Text>
        <Text style={[styles.category, { color: colors.secondary }]}>{stotram.category}</Text>
        
        <View style={[styles.contentCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sanskritText, { color: colors.text }]}>
            {stotram.content}
          </Text>
        </View>
      </ScrollView>
      
      {/* Sticky Audio Player */}
      <AudioPlayerUI title={stotram.title} audioUrl={stotram.audioUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  contentCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  sanskritText: {
    fontSize: 20,
    lineHeight: 36,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default StotramDetailScreen;
