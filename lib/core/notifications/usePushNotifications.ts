import { useEffect } from 'react';
import { Platform } from 'react-native';
import { supabase } from '../../core/supabase/client.supabase';
import { NotificationAdapter } from '../../core/notifications/notification.adapter';

NotificationAdapter.setup();

export const usePushNotifications = (userId?: string) => {
  useEffect(() => {
    if (!userId) return;

    const register = async () => {
      try {
        const token = await NotificationAdapter.registerForPushNotificationsAsync();
        if (token) {
          // Agregamos un pequeño delay de 1.5s para asegurar que el trigger 
          // de creación de perfil en Supabase haya terminado
          setTimeout(async () => {
            await saveTokenToDatabase(token, userId);
          }, 1500);
        }
      } catch (error) {
        console.error('❌ Error registrando notificaciones:', error);
      }
    };

    register();
  }, [userId]);
};

async function saveTokenToDatabase(token: string, userId: string) {
  // Verificamos primero si el perfil existe para evitar el error 23503
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single();

  if (!profile) {
    console.warn('⚠️ El perfil aún no existe en la DB. Reintentando en breve...');
    return;
  }

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
    console.error('❌ Error guardando device (Code 23503?):', error.message);
  } else {
    console.log('✅ Dispositivo registrado en Supabase');
  }
}