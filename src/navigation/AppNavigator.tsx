import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';

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

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
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
  Search: undefined;
  Calendar: undefined;
  Profile: undefined;
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

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = '';
        if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
        else if (route.name === 'Calendar') iconName = focused ? 'calendar' : 'calendar-outline';
        else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

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
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Calendar" component={CalendarScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
