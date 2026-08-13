import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Welcome to Vipra Sathi',
    description: 'Your digital companion for daily spiritual practices, poojas, and panchang.',
    image: require('../assets/images/onboarding_1.png')
  },
  {
    id: '2',
    title: 'Daily Panchang & Muhurt',
    description: 'Stay updated with accurate daily panchang, auspicious timings, and personalized alerts.',
    image: require('../assets/images/onboarding_2.png')
  },
  {
    id: '3',
    title: 'Library of Mantras & Poojas',
    description: 'Access a vast library of aartis, stotrams, and complete pooja guidelines.',
    image: require('../assets/images/onboarding_3.png')
  }
];

const OnboardingScreen = () => {
  const { colors } = useTheme();
  const { continueAsGuest, completeOnboardingFlow } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboardingFlow();
    }
  };

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={[styles.title, { color: '#FFFFFF' }]}>{item.title}</Text>
        <Text style={[styles.description, { color: 'rgba(255, 255, 255, 0.9)' }]}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#D35400' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={continueAsGuest} style={styles.skipButton}>
          <Text style={[styles.skipText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index.toString()}
              style={[
                styles.dot,
                { backgroundColor: currentIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)' },
                currentIndex === index && styles.activeDot
              ]}
            />
          ))}
        </View>
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextText}>
            {currentIndex === SLIDES.length - 1 ? 'Login / Signup' : 'Next'}
          </Text>
          <Icon name={currentIndex === SLIDES.length - 1 ? "log-in" : "arrow-right"} size={20} color="#FFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 60,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 35,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    width: 24,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#1E293B',
    width: '90%',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  }
});

export default OnboardingScreen;
