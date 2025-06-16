import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  const router = useRouter();
  const { session, loading } = useAuth();
  const [progress, setProgress] = useState(0);
  
  // Animation values
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    // Logo entrance animation
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withTiming(1, { 
      duration: 800, 
      easing: Easing.out(Easing.back(1.7)) 
    });

    // Pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      false
    );

    // Progress bar animation
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        progressWidth.value = withTiming((newProgress / 100) * (width - 80), {
          duration: 100
        });
        return newProgress;
      });
    }, 40);

    // Navigate after 4 seconds or when auth is ready
    const navigationTimer = setTimeout(() => {
      if (!loading) {
        if (session) {
          router.replace('/(tabs)');
        } else {
          router.replace('/login');
        }
      }
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(navigationTimer);
    };
  }, [loading, session]);

  // Navigate immediately if auth state is determined and loading is complete
  useEffect(() => {
    if (!loading && progress >= 100) {
      if (session) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }
  }, [loading, session, progress]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
  }));

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <Animated.View style={[styles.logoBackground, pulseAnimatedStyle]}>
            <CreditCard size={48} color="#ffffff" strokeWidth={2} />
          </Animated.View>
          <Text style={styles.logoText}>OfiPay</Text>
          <Text style={styles.tagline}>Secure Digital Payments</Text>
        </Animated.View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, progressAnimatedStyle]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>

        {/* Loading Text */}
        <Text style={styles.loadingText}>Initializing secure connection...</Text>
      </View>

      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 0.5,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  progressContainer: {
    width: width - 80,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: height * 0.3,
    right: -100,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});