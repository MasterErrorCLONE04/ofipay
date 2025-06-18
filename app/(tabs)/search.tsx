import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  Filter, 
  MapPin, 
  Star,
  Calendar,
  X
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Professional {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  hourlyRate: number;
  isAvailable: boolean;
  category: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);

  const categories: Category[] = [
    { id: 'beauty', name: 'Beauty', icon: '💄', color: '#F59E0B' },
    { id: 'home', name: 'Home', icon: '🏠', color: '#10B981' },
    { id: 'care', name: 'Care', icon: '👶', color: '#EF4444' },
    { id: 'education', name: 'Education', icon: '📚', color: '#8B5CF6' },
    { id: 'tech', name: 'Tech', icon: '💻', color: '#3B82F6' },
    { id: 'fitness', name: 'Fitness', icon: '💪', color: '#F97316' },
  ];

  useEffect(() => {
    loadProfessionals();
  }, []);

  useEffect(() => {
    filterProfessionals();
  }, [searchQuery, selectedCategory, professionals]);

  const loadProfessionals = () => {
    // Mock data - replace with actual API calls
    const mockProfessionals: Professional[] = [
      {
        id: '1',
        name: 'Sofia Martinez',
        specialty: 'Hair Stylist',
        avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 4.9,
        reviewCount: 127,
        location: 'Downtown',
        hourlyRate: 65,
        isAvailable: true,
        category: 'beauty',
      },
      {
        id: '2',
        name: 'Miguel Rodriguez',
        specialty: 'Electrician',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 4.8,
        reviewCount: 89,
        location: 'Westside',
        hourlyRate: 85,
        isAvailable: true,
        category: 'home',
      },
      {
        id: '3',
        name: 'Ana Gutierrez',
        specialty: 'Personal Trainer',
        avatar: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 5.0,
        reviewCount: 156,
        location: 'Fitness Center',
        hourlyRate: 75,
        isAvailable: false,
        category: 'fitness',
      },
      {
        id: '4',
        name: 'Carlos Mendez',
        specialty: 'Plumber',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 4.7,
        reviewCount: 203,
        location: 'Northside',
        hourlyRate: 90,
        isAvailable: true,
        category: 'home',
      },
      {
        id: '5',
        name: 'Isabella Torres',
        specialty: 'Math Tutor',
        avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 4.9,
        reviewCount: 78,
        location: 'University Area',
        hourlyRate: 45,
        isAvailable: true,
        category: 'education',
      },
      {
        id: '6',
        name: 'Roberto Silva',
        specialty: 'Web Developer',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        rating: 4.8,
        reviewCount: 134,
        location: 'Tech District',
        hourlyRate: 120,
        isAvailable: true,
        category: 'tech',
      },
    ];
    
    setProfessionals(mockProfessionals);
  };

  const filterProfessionals = () => {
    let filtered = professionals;

    if (searchQuery) {
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(prof => prof.category === selectedCategory);
    }

    setFilteredProfessionals(filtered);
  };

  const handleBookAppointment = (professionalId: string) => {
    router.push(`/appointment/book?professionalId=${professionalId}`);
  };

  const renderCategory = (category: Category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryItem,
        selectedCategory === category.id && styles.categoryItemSelected
      ]}
      onPress={() => setSelectedCategory(
        selectedCategory === category.id ? null : category.id
      )}
    >
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text style={[
        styles.categoryName,
        selectedCategory === category.id && styles.categoryNameSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProfessional = (professional: Professional) => (
    <TouchableOpacity
      key={professional.id}
      style={styles.professionalCard}
      onPress={() => router.push(`/professional/${professional.id}`)}
    >
      <Image source={{ uri: professional.avatar }} style={styles.professionalAvatar} />
      
      <View style={styles.professionalInfo}>
        <View style={styles.professionalHeader}>
          <Text style={styles.professionalName}>{professional.name}</Text>
          {professional.isAvailable && (
            <View style={styles.availableBadge}>
              <Text style={styles.availableText}>Available</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.professionalSpecialty}>{professional.specialty}</Text>
        
        <View style={styles.professionalMeta}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FCD34D" fill="#FCD34D" />
            <Text style={styles.rating}>{professional.rating}</Text>
            <Text style={styles.reviewCount}>({professional.reviewCount})</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <MapPin size={12} color="#9CA3AF" />
            <Text style={styles.location}>{professional.location}</Text>
          </View>
        </View>
        
        <View style={styles.professionalFooter}>
          <Text style={styles.hourlyRate}>${professional.hourlyRate}/hr</Text>
          <TouchableOpacity
            style={[
              styles.scheduleButton,
              !professional.isAvailable && styles.scheduleButtonDisabled
            ]}
            onPress={() => handleBookAppointment(professional.id)}
            disabled={!professional.isAvailable}
          >
            <Calendar size={16} color={professional.isAvailable ? "#ffffff" : "#9CA3AF"} />
            <Text style={[
              styles.scheduleButtonText,
              !professional.isAvailable && styles.scheduleButtonTextDisabled
            ]}>
              Schedule
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Professionals</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#667eea" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search professionals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map(renderCategory)}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredProfessionals.length} professionals found
          </Text>
          {selectedCategory && (
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={styles.clearFiltersText}>Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.professionalsList}>
          {filteredProfessionals.map(renderProfessional)}
        </View>

        {filteredProfessionals.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No professionals found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    minWidth: 80,
  },
  categoryItemSelected: {
    backgroundColor: '#667eea',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  categoryNameSelected: {
    color: '#ffffff',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  clearFiltersButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  clearFiltersText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  professionalsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  professionalCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  professionalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  professionalInfo: {
    flex: 1,
    gap: 6,
  },
  professionalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  professionalName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
  },
  availableBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  availableText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#065F46',
  },
  professionalSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  professionalMeta: {
    gap: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  professionalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  hourlyRate: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  scheduleButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  scheduleButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  scheduleButtonTextDisabled: {
    color: '#9CA3AF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});