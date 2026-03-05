import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { clearAllData } from '@/lib/clear-all-data';
import { colors } from '@/lib/theme';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { usePremiumStore } from '@/lib/stores/premium-store';
import {
  ArrowLeft,
  User,
  Users,
  Heart,
  Palette,
  Bell,
  Crown,
  Info,
  FileText,
  Shield,
  LogOut,
  Trash2,
  ChevronRight,
} from 'lucide-react-native';
import { useAuth } from '@/lib/auth';

type SettingsItem = {
  label: string;
  description?: string;
  icon: any;
  color: string;
  onPress: () => void;
};

type SettingsSection = {
  title: string;
  items: SettingsItem[];
};

export default function SettingsScreen() {
  const name = useOnboardingStore((s) => s.name);
  const relationshipType = useOnboardingStore((s) => s.relationshipType);
  const resetOnboarding = useOnboardingStore((s) => s.resetOnboarding);
  const partnerName = usePartnerStore((s) => s.partnerName);
  const isConnected = usePartnerStore((s) => s.isConnected);
  const setPremium = usePremiumStore((s) => s.setPremium);
  const auth = useAuth();

  const relationLabels: Record<string, string> = {
    dating: 'Daten',
    relationship: 'In een relatie',
    engaged: 'Verloofd',
    married: 'Getrouwd',
  };

  const sections: SettingsSection[] = [
    {
      title: 'Account',
      items: [
        {
          label: name || 'Jouw profiel',
          description: 'Naam en persoonlijke gegevens',
          icon: User,
          color: colors.terracotta.DEFAULT,
          onPress: () => router.push('/activity/edit-profile' as any),
        },
        {
          label: isConnected && partnerName ? partnerName : 'Partner uitnodigen',
          description: isConnected ? 'Verbonden' : 'Verbind via koppelcode',
          icon: Users,
          color: colors.oceaan.DEFAULT,
          onPress: () => router.push('/activity/connect' as any),
        },
        {
          label: relationshipType ? relationLabels[relationshipType] || 'Relatie' : 'Over jullie relatie',
          description: 'Relatiestatus en woonsituatie',
          icon: Heart,
          color: colors.salie.DEFAULT,
          onPress: () => router.push('/activity/edit-relationship' as any),
        },
      ],
    },
    {
      title: 'Voorkeuren',
      items: [
        {
          label: 'Onderwerpen personaliseren',
          description: 'Pas je geselecteerde onderwerpen aan',
          icon: Palette,
          color: colors.goud.DEFAULT,
          onPress: () => router.push('/activity/edit-topics' as any),
        },
        {
          label: 'Notificaties',
          description: 'Herinneringen en meldingen',
          icon: Bell,
          color: colors.salie.DEFAULT,
          onPress: () => router.push('/activity/notification-settings' as any),
        },
        {
          label: 'Liefdestaal quiz',
          description: 'Ontdek elkaars liefdestaal',
          icon: Heart,
          color: colors.terracotta.DEFAULT,
          onPress: () => router.push('/activity/love-language' as any),
        },
      ],
    },
    {
      title: 'Abonnement',
      items: [
        {
          label: 'Samen Premium',
          description: 'Ontgrendel alle functies',
          icon: Crown,
          color: colors.goud.DEFAULT,
          onPress: () => Alert.alert('Samen Premium', 'Premium-abonnementen komen binnenkort.'),
        },
      ],
    },
    {
      title: 'Over',
      items: [
        {
          label: 'Over Samen',
          description: 'Versie 1.0.0',
          icon: Info,
          color: '#6B7C8F',
          onPress: () => Alert.alert('Over Samen', 'Samen v1.0.0\n\nEen app voor koppels die samen willen groeien.'),
        },
        {
          label: 'Privacybeleid',
          icon: Shield,
          color: '#6B7C8F',
          onPress: () => Alert.alert('Privacybeleid', 'Het privacybeleid wordt binnenkort toegevoegd.'),
        },
        {
          label: 'Voorwaarden',
          icon: FileText,
          color: '#6B7C8F',
          onPress: () => Alert.alert('Voorwaarden', 'De voorwaarden worden binnenkort toegevoegd.'),
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Uitloggen',
      'Weet je zeker dat je wilt uitloggen?',
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Uitloggen',
          style: 'destructive',
          onPress: async () => {
            try {
              await auth.signOut();
            } catch {}
            await clearAllData();
            router.replace('/');
          },
        },
      ],
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Account verwijderen',
      'Weet je dit zeker? Al je gegevens worden permanent verwijderd. Dit kan niet ongedaan worden.',
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Verwijderen',
          style: 'destructive',
          onPress: async () => {
            // Try server-side delete, but always clear local data
            await auth.deleteAccount();
            await clearAllData();
            router.replace('/');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: colors.zand.DEFAULT,
          }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <Text
          className="text-lg font-bold"
          style={{ color: colors.nachtblauw, marginLeft: 12 }}
        >
          Instellingen
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <View key={section.title} style={{ paddingHorizontal: 24, marginTop: 24 }}>
            <Text
              className="text-xs font-semibold"
              style={{ color: '#9CA3AF', marginBottom: 8, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {section.title}
            </Text>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.zand.DEFAULT,
                overflow: 'hidden',
              }}
            >
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.label}
                    onPress={item.onPress}
                    activeOpacity={0.6}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      borderBottomWidth: index < section.items.length - 1 ? 1 : 0,
                      borderBottomColor: colors.zand.light,
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: item.color + '12',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Icon size={18} color={item.color} strokeWidth={1.8} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text className="text-base font-medium" style={{ color: colors.nachtblauw }}>
                        {item.label}
                      </Text>
                      {item.description && (
                        <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                          {item.description}
                        </Text>
                      )}
                    </View>
                    <ChevronRight size={16} color="#9CA3AF" strokeWidth={1.5} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Logout & Delete */}
        <View style={{ paddingHorizontal: 24, marginTop: 32, gap: 12 }}>
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 14,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.zand.dark,
            }}
          >
            <LogOut size={16} color="#9CA3AF" strokeWidth={2} />
            <Text className="text-base font-medium" style={{ color: '#6B7C8F', marginLeft: 8 }}>
              Uitloggen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteAccount}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 14,
              borderRadius: 16,
            }}
          >
            <Trash2 size={14} color="#DC2626" strokeWidth={2} />
            <Text className="text-sm font-medium" style={{ color: '#DC2626', marginLeft: 6 }}>
              Account verwijderen
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: 16, paddingBottom: 12 }}>
          <Text className="text-xs" style={{ color: '#C8CDD3' }}>
            Samen v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
