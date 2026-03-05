import { Tabs } from 'expo-router';
import { colors } from '@/lib/theme';
import {
  TabVandaag,
  TabOntdek,
  TabVerhaal,
  TabBespreek,
  TabWij,
} from '@/components/icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.terracotta.DEFAULT,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 85,
          borderTopWidth: 0.5,
          borderTopColor: '#E5E7EB',
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="vandaag"
        options={{
          title: 'Vandaag',
          tabBarIcon: ({ color, size }) => (
            <TabVandaag size={size ?? 22} color={color} strokeWidth={1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="ontdek"
        options={{
          title: 'Ontdek',
          tabBarIcon: ({ color, size }) => (
            <TabOntdek size={size ?? 22} color={color} strokeWidth={1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="verhaal"
        options={{
          title: 'Ons Verhaal',
          tabBarIcon: ({ color, size }) => (
            <TabVerhaal size={size ?? 22} color={color} strokeWidth={1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="praat"
        options={{
          title: 'Samen',
          tabBarIcon: ({ color, size }) => (
            <TabBespreek size={size ?? 22} color={color} strokeWidth={1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="wij"
        options={{
          title: 'Wij',
          tabBarIcon: ({ color, size }) => (
            <TabWij size={size ?? 22} color={color} strokeWidth={1.8} />
          ),
        }}
      />
    </Tabs>
  );
}
