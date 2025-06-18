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
import { User, Calendar, Camera, ArrowRight, ArrowLeft, CircleCheck as CheckCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 1,
    icon: User,
    title: 'Complete your professional profile',
    description: 'Clients want to know who you are. Add your photo, bio, and specialty.',
    buttonText: "Let's go",
    action: 'profile'
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Set your availability',
    description: 'Define the days and hours you can serve so your clients can easily book.',
    buttonText: 'Set Schedule',
    action: 'availability'
  },
  {
    id: 3,
    icon: Camera,
    title: 'Post Your Work',
    description: 'Share your latest jobs or promotions and attract more clients.',
    buttonText: 'Post Now',
    action: 'posts'
  }
];

export default function ProfessionalOnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Animation values
  const fadeIn = useSharedValue(1);
  const slideX = useSharedValue(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      fadeIn.value = withTiming(0, { duration: 200 }, () => {
        setCurrentStep(prev => prev + 1);
        fadeIn.value = withTiming(1, { duration: 300 });
      });
    } else {
      handleAction();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      fadeIn.value = withTiming(0, { duration: 200 }, () => {
        setCurrentStep(prev => prev - 1);
        fadeIn.value = withTiming(1, { duration: 300 });
      });
    }
  };

  const handleAction = () => {
    const step = onboardingSteps[currentStep];
    switch (step.action) {
      case 'profile':
        router.push('/(professional)/profile');
        break;
      case 'availability':
        router.push('/(professional)/availability');
        break;
      case 'posts':
        router.push('/(professional)/posts');
        break;
      default:
        router.replace('/(professional)');
    }
  };

  const handleSkip = () => {
    router.replace('/(professional)');
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  const step = onboardingSteps[currentStep];
  const IconComponent = step.icon;

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to SkillSync Pro!</Text>
          <Text style={styles.subtitle}>Let's set up your professional profile</Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive
              ]}
            />
          ))}
        </View>

        {/* Step Content */}
        <Animated.View style={[styles.stepContainer, animatedStyle]}>
          <View style={styles.iconContainer}>
            <IconComponent size={64} color="#ffffff" />
          </View>
          
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </Animated.View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          {/* Previous Button */}
          {currentStep > 0 && (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePrevious}
            >
              <ArrowLeft size={20} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          {/* Action Button */}
          <TouchableOpacity
            style={[styles.actionButton, currentStep === 0 && styles.actionButtonFull]}
            onPress={handleAction}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.actionButtonGradient}
            >
              <Text style={styles.actionButtonText}>{step.buttonText}</Text>
              <ArrowRight size={20} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip tutorial</Text>
        </TouchableOpacity>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipCard}>
            <CheckCircle size={20} color="#10B981" />
            <Text style={styles.tipText}>
              Complete all steps to maximize your visibility
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <CheckCircle size={20} color="#10B981" />
            <Text style={styles.tipText}>
              You can always update your profile later
            </Text>
          </View>
        </View>
      </View>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 60,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressDotActive: {
    backgroundColor: '#ffffff',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  previousButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },
  previousButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  actionButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonFull: {
    flex: 1,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  skipButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  tipsContainer: {
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
  },
});