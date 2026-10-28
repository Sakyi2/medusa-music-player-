import SettingsScreen from '../../src/screens/profile-screens/SettingsScreen';
import { useRouter } from 'expo-router';

export default function SettingsRoute() {
  const router = useRouter();

  return <SettingsScreen onBackPress={() => router.back()} onLogout={() => {}} />;
}