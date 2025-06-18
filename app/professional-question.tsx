import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Briefcase, 
  Users, 
  ArrowRight,
  CheckCircle
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function ProfessionalQuestionScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<'professional' | 'user' | null>(null);

  // Animation values
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(50);

  useState(() => {
    fadeIn.value = withTiming(1, { duration: 800 });
    slideUp.value = withTiming(0, { duration: 800 });
  });

  const handleContinue = () => {
    if (selectedOption === 'professional') {
      router.replace('/professional-setup');
    } else {
      router.replace('/(tabs)');
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to SkillSync!</Text>
          <Text style={styles.subtitle}>
            Do you want to offer your services on SkillSync?
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {/* Professional Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'professional' && styles.selectedCard
            ]}
            onPress={() => setSelectedOption('professional')}
          >
            <View style={styles.optionHeader}>
              <View style={[
                styles.iconContainer,
                selectedOption === 'professional' && styles.selectedIconContainer
              ]}>
                <Briefcase 
                  size={32} 
                  color={selectedOption === 'professional' ? '#ffffff' : '#667eea'} 
                />
              </View>
              {selectedOption === 'professional' && (
                <CheckCircle size={24} color="#10B981" />
              )}
            </View>
            
            <Text style={[
              styles.optionTitle,
              selectedOption === 'professional' && styles.selectedTitle
            ]}>
              Yes, I'm a Professional
            </Text>
            
            <Text style={[
              styles.optionDescription,
              selectedOption === 'professional' && styles.selectedDescription
            ]}>
              Create a professional profile, showcase your services, and connect with clients
            </Text>

            <View style={styles.featuresList}>
              <Text style={[
                styles.feature,
                selectedOption === 'professional' && styles.selectedFeature
              ]}>
                • Create professional profile
              </Text>
              <Text style={[
                styles.feature,
                selectedOption === 'professional' && styles.selectedFeature
              ]}>
                • Manage appointments
              </Text>
              <Text style={[
                styles.feature,
                selectedOption === 'professional' && styles.selectedFeature
              ]}>
                • Share your work
              </Text>
            </View>
          </TouchableOpacity>

          {/* User Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'user' && styles.selectedCard
            ]}
            onPress={() => setSelectedOption('user')}
          >
            <View style={styles.optionHeader}>
              <View style={[
                styles.iconContainer,
                selectedOption === 'user' && styles.selectedIconContainer
              ]}>
                <Users 
                  size={32} 
                  color={selectedOption === 'user' ? '#ffffff' : '#667eea'} 
                />
              </View>
              {selectedOption === 'user' && (
                <CheckCircle size={24} color="#10B981" />
              )}
            </View>
            
            <Text style={[
              styles.optionTitle,
              selectedOption === 'user' && styles.selectedTitle
            ]}>
              No, I'm looking for services
            </Text>
            
            <Text style={[
              styles.optionDescription,
              selectedOption === 'user' && styles.selectedDescription
            ]}>
              Find and book services from verified professionals in your area
            </Text>

            <View style={styles.featuresList}>
              <Text style={[
                styles.feature,
                selectedOption === 'user' && styles.selectedFeature
              ]}>
                • Find professionals
              </Text>
              <Text style={[
                styles.feature,
                selectedOption === 'user' && styles.selectedFeature
              ]}>
                • Book appointments
              </Text>
              <Text style={[
                styles.feature,
                selectedOption === 'user' && styles.selectedFeature
              ]}>
                • Rate and review
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedOption && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedOption}
        >
          <LinearGradient
            colors={selectedOption ? ['#10B981', '#059669'] : ['#9CA3AF', '#6B7280']}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <ArrowRight size={20} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
  },
  optionsContainer: {
    flex: 1,
    gap: 20,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedCard: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIconContainer: {
    backgroundColor: '#667eea',
  },
  optionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  selectedTitle: {
    color: '#065F46',
  },
  optionDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  selectedDescription: {
    color: '#047857',
  },
  featuresList: {
    gap: 8,
  },
  feature: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  selectedFeature: {
    color: '#059669',
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});