import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen() {
  const { user, logout, token } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.147:8000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsChangingPassword(false);
      } else {
        Alert.alert('Error', data.detail || 'Failed to change password');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header with Back Button */}
      <View style={styles.headerBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
        </View>

        {/* User Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>Username</Text>
            <Text style={styles.infoValue}>{user?.username || 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email || 'Not set'}</Text>
          </View>
        </View>

        {/* Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          {!isChangingPassword ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsChangingPassword(true)}
            >
              <Ionicons name="key-outline" size={20} color="#007AFF" />
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.passwordForm}>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <View style={styles.passwordButtons}>
                <TouchableOpacity
                  style={[styles.passwordButton, styles.cancelButton]}
                  onPress={() => {
                    setIsChangingPassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.passwordButton, styles.saveButton]}
                  onPress={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#38383A',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontSize: 17,
    color: '#007AFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  infoLabel: {
    fontSize: 16,
    color: '#999',
    marginLeft: 12,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 12,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#2C2C2E',
  },
  logoutText: {
    color: '#FF3B30',
  },
  passwordForm: {
    marginTop: 8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 12,
  },
  passwordButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  passwordButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2C2C2E',
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});