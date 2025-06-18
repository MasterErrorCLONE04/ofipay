import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  RefreshControl,
  Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  Share2,
  MapPin,
  Star,
  Calendar
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface Post {
  id: string;
  professional: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
    rating: number;
    location: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
}

interface Story {
  id: string;
  name: string;
  avatar: string;
  isViewed: boolean;
}

export default function HomeScreen() {
  const { userProfile } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    loadFeedData();
  }, []);

  const loadFeedData = () => {
    // Mock data - replace with actual API calls
    setStories([
      {
        id: '1',
        name: 'Featured',
        avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isViewed: false,
      },
      {
        id: '2',
        name: 'Maria S.',
        avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isViewed: false,
      },
      {
        id: '3',
        name: 'Carlos R.',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isViewed: true,
      },
    ]);

    setPosts([
      {
        id: '1',
        professional: {
          id: 'prof1',
          name: 'Sofia Martinez',
          specialty: 'Hair Stylist',
          avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          rating: 4.9,
          location: 'Downtown',
        },
        content: 'Just finished this amazing balayage transformation! ✨ Book your appointment for the holiday season. Limited slots available!',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        likes: 127,
        comments: 23,
        isLiked: false,
        createdAt: '2h ago',
      },
      {
        id: '2',
        professional: {
          id: 'prof2',
          name: 'Miguel Rodriguez',
          specialty: 'Electrician',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          rating: 4.8,
          location: 'Westside',
        },
        content: 'Completed a full home electrical upgrade today. Safety first! 🔌 Contact me for your electrical needs - licensed and insured.',
        image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        likes: 89,
        comments: 12,
        isLiked: true,
        createdAt: '4h ago',
      },
      {
        id: '3',
        professional: {
          id: 'prof3',
          name: 'Ana Gutierrez',
          specialty: 'Personal Trainer',
          avatar: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          rating: 5.0,
          location: 'Fitness Center',
        },
        content: 'New year, new goals! 💪 Starting my transformation program next month. Limited spots available. DM me for details!',
        likes: 156,
        comments: 34,
        isLiked: false,
        createdAt: '6h ago',
      },
    ]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadFeedData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookAppointment = (professionalId: string) => {
    router.push(`/appointment/book?professionalId=${professionalId}`);
  };

  const renderStory = (story: Story) => (
    <TouchableOpacity key={story.id} style={styles.storyItem}>
      <LinearGradient
        colors={story.isViewed ? ['#E5E7EB', '#E5E7EB'] : ['#667eea', '#764ba2']}
        style={styles.storyGradient}
      >
        <Image source={{ uri: story.avatar }} style={styles.storyImage} />
      </LinearGradient>
      <Text style={styles.storyName}>{story.name}</Text>
    </TouchableOpacity>
  );

  const renderPost = (post: Post) => (
    <View key={post.id} style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity 
          style={styles.professionalInfo}
          onPress={() => router.push(`/professional/${post.professional.id}`)}
        >
          <Image source={{ uri: post.professional.avatar }} style={styles.professionalAvatar} />
          <View style={styles.professionalDetails}>
            <Text style={styles.professionalName}>{post.professional.name}</Text>
            <View style={styles.professionalMeta}>
              <Text style={styles.professionalSpecialty}>{post.professional.specialty}</Text>
              <View style={styles.ratingContainer}>
                <Star size={12} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.rating}>{post.professional.rating}</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <MapPin size={12} color="#9CA3AF" />
              <Text style={styles.location}>{post.professional.location}</Text>
              <Text style={styles.timestamp}>• {post.createdAt}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => handleBookAppointment(post.professional.id)}
        >
          <Calendar size={16} color="#667eea" />
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{post.content}</Text>

      {/* Post Image */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(post.id)}
        >
          <Heart 
            size={20} 
            color={post.isLiked ? "#EF4444" : "#6B7280"} 
            fill={post.isLiked ? "#EF4444" : "none"}
          />
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            {post.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#6B7280" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>OfiPay</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/(tabs)/notifications')}
          >
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileInitial}>
              {userProfile?.full_name?.charAt(0) || 'U'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stories */}
        <View style={styles.storiesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContent}
          >
            {stories.map(renderStory)}
          </ScrollView>
        </View>

        {/* Posts Feed */}
        <View style={styles.feedContainer}>
          {posts.map(renderPost)}
        </View>
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
  logo: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  storiesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  storiesContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    gap: 8,
  },
  storyGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  storyName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textAlign: 'center',
  },
  feedContainer: {
    paddingTop: 8,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    paddingVertical: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  professionalInfo: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  professionalAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  professionalDetails: {
    flex: 1,
    gap: 2,
  },
  professionalName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  professionalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  professionalSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
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
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  bookButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
  },
  postContent: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  postImage: {
    width: width,
    height: 300,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  likedText: {
    color: '#EF4444',
  },
});