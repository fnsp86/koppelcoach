import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { colors } from '@/lib/theme';

type TabIconProps = {
  label: string;
  focused: boolean;
  color: string;
};

function TabIcon({ label, focused, color }: TabIconProps) {
  const icons: Record<string, string> = {
    Vandaag: '\u2665',
    Ontdek: '\u2737',
    Dagboek: '\u25A3',
    Inzichten: '\u25A4',
    Profiel: '\u25CF',
  };

  return (
    <View className="items-center justify-center pt-1">
      <Text
        style={{
          color,
          fontSize: 20,
          fontWeight: focused ? '700' : '400',
        }}
      >
        {icons[label] ?? '\u25CB'}
      </Text>
    </View>
  );
}

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
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="vandaag"
        options={{
          title: 'Vandaag',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Vandaag" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ontdek"
        options={{
          title: 'Ontdek',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Ontdek" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dagboek"
        options={{
          title: 'Dagboek',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Dagboek" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inzichten"
        options={{
          title: 'Inzichten',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Inzichten" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profiel"
        options={{
          title: 'Profiel',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Profiel" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
