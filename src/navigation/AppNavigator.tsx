import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyForgotOtpScreen from '../screens/VerifyForgotOtpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

import DashboardScreen from '../screens/DashboardScreen';
import SearchScreen from '../screens/SearchScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LibraryHubScreen from '../screens/LibraryHubScreen';
import PoojaLibraryScreen from '../screens/PoojaLibraryScreen';
import PoojaDetailScreen from '../screens/PoojaDetailScreen';
import MenuScreen from '../screens/MenuScreen';
import KundaliScreen from '../screens/KundaliScreen';
import MuhurtScreen from '../screens/MuhurtScreen';
import SamagriScreen from '../screens/SamagriScreen';
import StotramLibraryScreen from '../screens/StotramLibraryScreen';
import StotramDetailScreen from '../screens/StotramDetailScreen';
import AartiLibraryScreen from '../screens/AartiLibraryScreen';
import AartiDetailScreen from '../screens/AartiDetailScreen';
import CommunityScreen from '../screens/CommunityScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import DakshinaCalculatorScreen from '../screens/DakshinaCalculatorScreen';
import HistoryScreen from '../screens/HistoryScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  PoojaLibrary: undefined;
  PoojaDetail: { poojaId: string };
  Kundali: undefined;
  Muhurt: undefined;
  Samagri: undefined;
  StotramLibrary: undefined;
  StotramDetail: { stotramId: string };
  AartiLibrary: undefined;
  AartiDetail: { aartiId: string };
  PostDetail: { postId: string };
  HelpCenter: undefined;
  Subscription: undefined;
  DakshinaCalculator: undefined;
  History: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  VerifyOtp: { email: string; flow?: 'signup' | 'forgot' };
  ForgotPassword: undefined;
  VerifyForgotOtp: { email: string };
  ResetPassword: { email: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Library: undefined;
  Calendar: undefined;
  Community: undefined;
  Menu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="VerifyForgotOtp" component={VerifyForgotOtpScreen} />
    <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </AuthStack.Navigator>
);

const MainTabNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Library') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Calendar') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Community') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          else if (route.name === 'Menu') iconName = focused ? 'menu' : 'menu-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        safeAreaInsets: { bottom: 0 },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Library" component={LibraryHubScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen name="PoojaLibrary" component={PoojaLibraryScreen} />
          <Stack.Screen name="PoojaDetail" component={PoojaDetailScreen} options={{ presentation: 'card' }} />
          <Stack.Screen name="Kundali" component={KundaliScreen} />
          <Stack.Screen name="Muhurt" component={MuhurtScreen} />
          <Stack.Screen name="Samagri" component={SamagriScreen} />
          <Stack.Screen name="StotramLibrary" component={StotramLibraryScreen} />
          <Stack.Screen name="StotramDetail" component={StotramDetailScreen} options={{ presentation: 'card' }} />
          <Stack.Screen name="AartiLibrary" component={AartiLibraryScreen} />
          <Stack.Screen name="AartiDetail" component={AartiDetailScreen} options={{ presentation: 'card' }} />
          <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="DakshinaCalculator" component={DakshinaCalculatorScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="PostDetail" component={PostDetailScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
