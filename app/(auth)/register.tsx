import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../lib/modules/auth/AuthProvider';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [loading, setLoading] = useState(false);
  const { signUpWithEmail } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    const { email, password, firstName, lastName } = form;
    if (!email || !password || !firstName || !lastName) return Alert.alert('Error', 'Completa todos los campos');
    if (password.length < 6) return Alert.alert('Error', 'Contraseña muy corta (mín. 6)');

    setLoading(true);
    try {
      await signUpWithEmail(email, password, firstName, lastName);
      Alert.alert('¡Éxito!', 'Cuenta creada 🎉', [{ text: 'Entrar', onPress: () => router.replace('/') }]);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.container}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.content}>
          <Text style={s.title}>🍔 Burger App</Text>
          <Text style={s.sub}>Crea tu perfil de Chef</Text>
          
          <TextInput placeholder="Nombre" value={form.firstName} onChangeText={t => update('firstName', t)} style={s.input} placeholderTextColor="#888" />
          <TextInput placeholder="Apellido" value={form.lastName} onChangeText={t => update('lastName', t)} style={s.input} placeholderTextColor="#888" />
          <TextInput placeholder="Email" value={form.email} onChangeText={t => update('email', t)} autoCapitalize="none" keyboardType="email-address" style={s.input} placeholderTextColor="#888" />
          <TextInput placeholder="Contraseña" value={form.password} onChangeText={t => update('password', t)} secureTextEntry style={s.input} placeholderTextColor="#888" />

          <TouchableOpacity style={[s.btn, loading && s.btnD]} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={s.btnT}>Registrarse</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={s.link}><Text style={s.linkT}>¿Ya tienes cuenta? Inicia sesión</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  scroll: { flexGrow: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 42, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
  sub: { fontSize: 20, color: '#F5A623', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 16, marginBottom: 16, color: '#FFF', borderWidth: 1, borderColor: '#333' },
  btn: { backgroundColor: '#F5A623', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 8 },
  btnD: { opacity: 0.6 },
  btnT: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  link: { marginTop: 24, alignItems: 'center' },
  linkT: { color: '#F5A623', fontSize: 15, fontWeight: '600' }
});