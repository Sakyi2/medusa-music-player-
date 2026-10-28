import ProfileScreen from '../src/screens/ProfileScreen'; // or your profile screen component
import { useRouter } from 'expo-router';

export default function ProfileRoute() {
  const router = useRouter();

  return <ProfileScreen onBackPress={() => router.back()} />;
}