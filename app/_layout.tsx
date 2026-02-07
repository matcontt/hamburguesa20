import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
// 1. Importamos ambos Providers
import { AuthProvider, useAuth } from "../lib//modules/auth/AuthProvider";
import { BurgerProvider } from "../lib/modules/builder/context/BurgerContext"; // Ajusta esta ruta si es necesario
import { usePushNotifications } from "../lib/core/notifications/usePushNotifications";

function AuthLayout() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Iniciamos notificaciones
  usePushNotifications(session?.user.id);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/');
    }
  }, [session, loading, segments]);

  return (
    // 2. Envolvemos el Stack con el BurgerProvider aquí
    // Así, cualquier pantalla dentro (como index) podrá usar useBurger()
    <BurgerProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
      </Stack>
    </BurgerProvider>
  );
}

export default function RootLayout() {
  return (
    // 3. El AuthProvider siempre va al inicio de todo
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}