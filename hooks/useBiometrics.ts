import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export function useBiometrics() {
  const [isCompatible, setIsCompatible] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkHardware();
  }, []);

  const checkHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsCompatible(compatible);

    if (compatible) {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setIsEnrolled(enrolled);
    }
  };

  const authenticate = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });
      return result.success;
    } catch (error) {
      console.error('Biometric auth error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    isCompatible,
    isEnrolled,
    authenticate,
    loading,
    biometryType: Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint', // Simplified for now
  };
}
