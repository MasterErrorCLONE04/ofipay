import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Calendar,
  Heart,
  Share2,
  Clock,
  Award
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Professional {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  location: string;
  hourlyRate: number;
  isAvailable: boolean;
  bio: string;
  experience: string;
  phone: string;
  gallery: string[];
  reviews: Review[];
  services: Service[];
}

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

export default function ProfessionalProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [selectedTab, setSelectedTab] = useState<'about' | 'services' | 'reviews'>('about');

  useEffect(() => {
    loadProfessional();
  }, [id]);

  const loadProfessional = () => {
    // Mock data - replace with actual API call
    const mockProfessional: Professional = {
      id: id as string,
      name: 'Sofia Martinez',
      specialty: 'Hair Stylist',
      avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      coverImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 127,
      location: 'Downtown Salon, 123 Main St',
      hourlyRate: 65,
      isAvailable: true,
      bio: 'Passionate hair stylist with over 8 years of experience in cutting, coloring, and styling. Specialized in balayage, highlights, and modern cuts. I believe every client deserves to feel beautiful and confident.',
      experience: '8+ years',
      phone: '+1 (555) 123-4567',
      gallery: [
        'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      ],
      services: [
        {
          id: '1',
          name: 'Haircut & Style',
          description: 'Professional cut and styling',
          price: 45,
          duration: '1 hour',
        },
        {
          id: '2',
          name: 'Balayage',
          description: 'Natural-looking highlights',
          price: 120,
          duration: '3 hours',
        },
        {
          id: '3',
          name: 'Color Treatment',
          description: 'Full color transformation',
          price: 85,
          duration: '2 hours',
        },
      ],
      reviews: [
        {
          id: '1',
          user: {
            name: 'Maria Garcia',
            avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          },
          rating: 5,
          comment: 'Amazing work! Sofia transformed my hair completely. Very professional and friendly.',
          date: '2 weeks ago',
        },
        {
          id: '2',
          user: {
            name: 'Jennifer Lopez',
            avatar: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          },
          rating: 5,
          comment: 'Best balayage I\'ve ever had! Will definitely come back.',
          date: '1 month ago',
        },
      ],
    };
    
    setProfessional(mockProfessional);
  };

  const handleBookAppointment = () => {
    router.push(`/appointment/book?professionalId=${id}`);
  };

  const handleCall = () => {
    // In a real app, use Linking.openURL(`tel:${professional?.phone}`)
    console.log('Call:', professional?.phone);
  };

  const handleMessage = () => {
    console.log('Message professional');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color="#FCD34D"
        fill={index < Math.floor(rating) ? "#FCD34D" : "none"}
      />
    ));
  };

  const renderAboutTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.bio}>{professional?.bio}</Text>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Experience</Text>
        <Text style={styles.infoText}>{professional?.experience}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Location</Text>
        <View style={styles.locationRow}>
          <MapPin size={16} color="#9CA3AF" />
          <Text style={styles.infoText}>{professional?.location}</Text>
        </View>
      </View>

      <View style={styles.gallerySection}>
        <Text style={styles.infoTitle}>Portfolio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.gallery}>
            {professional?.gallery.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.galleryImage} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );

  const renderServicesTab = () => (
    <View style={styles.tabContent}>
      {professional?.services.map((service) => (
        <View key={service.id} style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>${service.price}</Text>
          </View>
          <Text style={styles.serviceDescription}>{service.description}</Text>
          <View style={styles.serviceMeta}>
            <Clock size={14} color="#9CA3AF" />
            <Text style={styles.serviceDuration}>{service.duration}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderReviewsTab = () => (
    <View style={styles.tabContent}>
      {professional?.reviews.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: review.user.avatar }} style={styles.reviewAvatar} />
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewerName}>{review.user.name}</Text>
              <View style={styles.reviewRating}>
                {renderStars(review.rating)}
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}
    </View>
  );

  if (!professional) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerAction}>
            <Heart size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction}>
            <Share2 size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <Image source={{ uri: professional.coverImage }} style={styles.coverImage} />

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: professional.avatar }} style={styles.profileAvatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.professionalName}>{professional.name}</Text>
              <Text style={styles.professionalSpecialty}>{professional.specialty}</Text>
              <View style={styles.ratingContainer}>
                {renderStars(professional.rating)}
                <Text style={styles.rating}>{professional.rating}</Text>
                <Text style={styles.reviewCount}>({professional.reviewCount} reviews)</Text>
              </View>
            </View>
            {professional.isAvailable && (
              <View style={styles.availableBadge}>
                <Text style={styles.availableText}>Available</Text>
              </View>
            )}
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.hourlyRate}>${professional.hourlyRate}/hr</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
            <Calendar size={20} color="#ffffff" />
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
            <Phone size={20} color="#667eea" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactButton} onPress={handleMessage}>
            <MessageCircle size={20} color="#667eea" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {['about', 'services', 'reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab as any)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {selectedTab === 'about' && renderAboutTab()}
        {selectedTab === 'services' && renderServicesTab()}
        {selectedTab === 'reviews' && renderReviewsTab()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  coverImage: {
    width: width,
    height: 300,
  },
  profileSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#ffffff',
    marginTop: -40,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  professionalName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  professionalSpecialty: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  availableBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availableText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#065F46',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  hourlyRate: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  contactButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#667eea',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#667eea',
  },
  tabContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 20,
  },
  bio: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
  infoSection: {
    gap: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gallerySection: {
    gap: 12,
  },
  gallery: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  serviceCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  servicePrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
  },
  serviceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  serviceDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  reviewCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewInfo: {
    flex: 1,
    gap: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
});