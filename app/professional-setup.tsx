import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  MapPin, 
  Phone, 
  DollarSign, 
  Calendar,
  Briefcase,
  FileText,
  Camera,
  ArrowRight,
  Check
} from 'lucide-react-native';

interface ProfessionalData {
  specialty: string;
  bio: string;
  location: string;
  phone: string;
  hourlyRate: string;
  yearsExperience: string;
}

const professions = [
  'Hair Stylist', 'Barber', 'Makeup Artist', 'Nail Technician',
  'Electrician', 'Plumber', 'Carpenter', 'Painter',
  'Personal Trainer', 'Yoga Instructor', 'Massage Therapist',
  'Tutor', 'Music Teacher', 'Language Teacher',
  'Web Developer', 'Graphic Designer', 'Photographer',
  'Cleaner', 'Gardener', 'Pet Groomer', 'Chef'
];

export default function ProfessionalSetupScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfessionalData>({
    specialty: '',
    bio: '',
    location: '',
    phone: '',
    hourlyRate: '',
    yearsExperience: '',
  });
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (field: keyof ProfessionalData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleProfession = (profession: string) => {
    setSelectedProfessions(prev => 
      prev.includes(profession)
        ? prev.filter(p => p !== profession)
        : [...prev, profession]
    );
  };

  const handleSaveProfile = async () => {
    if (!formData.specialty || !formData.bio || !formData.location || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (selectedProfessions.length === 0) {
      Alert.alert('Error', 'Please select at least one profession');
      return;
    }

    setIsLoading(true);

    // Simulate API call to create professional profile
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success!',
        'Your professional profile has been created successfully!',
        [
          {
            text: 'Start Tutorial',
            onPress: () => router.replace('/professional-onboarding'),
          },
        ]
      );
    }, 2000);
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Basic Information</Text>
      
      {/* Profile Photo */}
      <TouchableOpacity style={styles.photoContainer}>
        <View style={styles.photoPlaceholder}>
          <Camera size={32} color="#9CA3AF" />
          <Text style={styles.photoText}>Add Profile Photo</Text>
        </View>
      </TouchableOpacity>

      {/* Specialty */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Specialty/Title *</Text>
        <View style={styles.inputContainer}>
          <Briefcase size={20} color="#667eea" />
          <TextInput
            style={styles.input}
            placeholder="e.g., Professional Barber"
            value={formData.specialty}
            onChangeText={(value) => updateFormData('specialty', value)}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Bio */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bio *</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
          <FileText size={20} color="#667eea" style={styles.textAreaIcon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell clients about your experience and services..."
            value={formData.bio}
            onChangeText={(value) => updateFormData('bio', value)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location *</Text>
        <View style={styles.inputContainer}>
          <MapPin size={20} color="#667eea" />
          <TextInput
            style={styles.input}
            placeholder="City or Municipality"
            value={formData.location}
            onChangeText={(value) => updateFormData('location', value)}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Phone */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Phone *</Text>
        <View style={styles.inputContainer}>
          <Phone size={20} color="#667eea" />
          <TextInput
            style={styles.input}
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChangeText={(value) => updateFormData('phone', value)}
            keyboardType="phone-pad"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Professional Details</Text>
      
      {/* Hourly Rate */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hourly Rate (Optional)</Text>
        <View style={styles.inputContainer}>
          <DollarSign size={20} color="#667eea" />
          <TextInput
            style={styles.input}
            placeholder="65"
            value={formData.hourlyRate}
            onChangeText={(value) => updateFormData('hourlyRate', value)}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Years of Experience */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Years of Experience</Text>
        <View style={styles.inputContainer}>
          <Calendar size={20} color="#667eea" />
          <TextInput
            style={styles.input}
            placeholder="5"
            value={formData.yearsExperience}
            onChangeText={(value) => updateFormData('yearsExperience', value)}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Profession Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select Your Professions *</Text>
        <Text style={styles.sublabel}>Choose all that apply</Text>
        <View style={styles.professionsGrid}>
          {professions.map((profession) => (
            <TouchableOpacity
              key={profession}
              style={[
                styles.professionChip,
                selectedProfessions.includes(profession) && styles.selectedProfessionChip
              ]}
              onPress={() => toggleProfession(profession)}
            >
              <Text style={[
                styles.professionText,
                selectedProfessions.includes(profession) && styles.selectedProfessionText
              ]}>
                {profession}
              </Text>
              {selectedProfessions.includes(profession) && (
                <Check size={16} color="#ffffff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Professional Profile</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(currentStep / 2) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>Step {currentStep} of 2</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            {currentStep === 1 ? renderStep1() : renderStep2()}
          </View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {currentStep === 2 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(1)}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.nextButton, currentStep === 1 && styles.nextButtonFull]}
            onPress={() => {
              if (currentStep === 1) {
                setCurrentStep(2);
              } else {
                handleSaveProfile();
              }
            }}
            disabled={isLoading}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {isLoading ? 'Creating Profile...' : currentStep === 1 ? 'Next' : 'Save and Activate Profile'}
              </Text>
              {!isLoading && <ArrowRight size={20} color="#ffffff" />}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  stepContainer: {
    gap: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    gap: 8,
  },
  photoText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  sublabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: -4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
  },
  textAreaContainer: {
    height: 120,
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  textAreaIcon: {
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  textArea: {
    height: 88,
    textAlignVertical: 'top',
  },
  professionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  professionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  selectedProfessionChip: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  professionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  selectedProfessionText: {
    color: '#ffffff',
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 12,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  nextButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});