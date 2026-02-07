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
          console.log('✅ Token obtenido:', token.substring(0, 30) + '...');
          
          // Esperar 3 segundos para que el perfil se cree
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          await saveTokenToDatabase(token, userId);
        }
      } catch (error) {
        console.error('❌ Error en registro:', error);
      }
    };

    register();
  }, [userId]);
};

async function saveTokenToDatabase(token: string, userId: string) {
  console.log('💾 Guardando token para usuario:', userId);
  
  try {
    // Opción 1: Eliminar registros anteriores de este token
    const { error: deleteError } = await supabase
      .from('devices')
      .delete()
      .eq('token', token);
    
    if (deleteError) {
      console.log('⚠️ No se pudo eliminar token anterior:', deleteError.message);
    }
    
    // Opción 2: Insertar el nuevo registro
    const { data, error } = await supabase
      .from('devices')
      .insert({ 
        user_id: userId,
        token: token,
        platform: Platform.OS,
        last_used_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error('❌ Error guardando token:', error.message);
      console.error('Código error:', error.code);
    } else {
      console.log('✅ Token guardado correctamente');
    }
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}
