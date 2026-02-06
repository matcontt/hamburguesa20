import { usePushNotifications } from "@/lib/core/notifications/usePushNotifications";
import { AuthProvider, useAuth } from "@/lib/modules/auth/AuthProvider";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function AuthLayout() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Iniciar sistema de notificaciones
  const userId = session?.user.id;
  usePushNotifications(userId);

  // Protección de rutas
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // No hay usuario y no está en login -> Redirigir a login
      router.replace('./(auth)/login');
    } else if (session && inAuthGroup) {
      // Hay usuario y está en login -> Redirigir a home
      router.replace('/');
    }
  }, [session, loading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/register" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}