import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: check auth state and couple status to route appropriately
  // For now, always redirect to login
  return <Redirect href="/(auth)/login" />;
}
