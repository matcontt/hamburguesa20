// lib/core/notifications/notification.adapter.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const NotificationAdapter = {
  setup: () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  },

  registerForPushNotificationsAsync: async (): Promise<string | null> => {
    if (!Device.isDevice) return null;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return null;

    // Obtenemos el ID desde Constants
    const projectId = Constants.expoConfig?.extra?.eas?.projectId || Constants.easConfig?.projectId;

    // Validación de formato UUID (8-4-4-4-12 caracteres)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!projectId || !uuidRegex.test(projectId)) {
      console.warn('⚠️ El ProjectID en app.json no es un UUID válido. Notificaciones desactivadas.');
      return null;
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log('✅ Push Token:', token);
      return token;
    } catch (error) {
      console.error('❌ Error de Expo:', error);
      return null;
    }
  }
};