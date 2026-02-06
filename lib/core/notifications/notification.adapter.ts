import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const NotificationAdapter = {
  /**
   * Configuración global de cómo se manejan las notificaciones en foreground
   */
  setup: () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,      // Mostrar alerta visual
        shouldPlaySound: true,       // Reproducir sonido
        shouldSetBadge: false,       // No alterar badge contador
        shouldShowBanner: true,      // Banner deslizable (iOS)
        shouldShowList: true,        // Mantener en centro de notificaciones
      }),
    });
  },

  /**
   * Obtiene el token de Expo Push Notifications
   * @returns ExponentPushToken o null si falla
   */
  registerForPushNotificationsAsync: async (): Promise<string | null> => {
    let token;

    // Configuración de canal Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Verificar que es un dispositivo físico
    if (Device.isDevice) {
      // Gestión de permisos
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('❌ Permiso de notificaciones denegado');
        return null;
      }

      // Obtener token
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      
      if (!projectId) {
        console.warn('⚠️ EAS Project ID no configurado. Configura "extra.eas.projectId" en app.json');
      }

      token = (await Notifications.getExpoPushTokenAsync({
        projectId,
      })).data;

      console.log('✅ Push Token obtenido:', token);
      
    } else {
      console.log('⚠️ Debes usar un dispositivo físico para Push Notifications');
    }

    return token || null;
  }
};