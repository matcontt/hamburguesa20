import { useEffect } from 'react';
import { Platform } from 'react-native';
import { supabase } from '../../core/supabase/client.supabase';
import { NotificationAdapter } from '../../core/notifications/notification.adapter';

// Setup inicial (se ejecuta una sola vez al cargar el módulo)
NotificationAdapter.setup();

/**
 * Hook para registrar dispositivo y recibir notificaciones push
 * @param userId - ID del usuario autenticado
 */
export const usePushNotifications = (userId?: string) => {
  useEffect(() => {
    // Guardia: no hacer nada si no hay usuario
    if (!userId) return;

    const register = async () => {
      try {
        // Obtener token del dispositivo
        const token = await NotificationAdapter.registerForPushNotificationsAsync();
        
        if (token) {
          console.log('📱 Registrando dispositivo en Supabase...');
          await saveTokenToDatabase(token, userId);
        }
      } catch (error) {
        console.error('❌ Error registrando notificaciones:', error);
      }
    };

    register();
    
  }, [userId]);
};

/**
 * Guarda el token en la base de datos
 */
async function saveTokenToDatabase(token: string, userId: string) {
  const { error } = await supabase
    .from('devices')
    .upsert({ 
      user_id: userId,
      token: token,
      platform: Platform.OS,
      last_used_at: new Date().toISOString()
    }, { 
      onConflict: 'token' 
    });

  if (error) {
    console.error('❌ Error guardando device:', error);
  } else {
    console.log('✅ Dispositivo registrado en Supabase');
  }
}