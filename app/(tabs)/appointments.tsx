import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert
} from 'react-native';
import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Phone, MessageCircle, X, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface Appointment {
  id: string;
  professional: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
    phone: string;
  };
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
  notes?: string;
  canCancel: boolean;
  canReschedule: boolean;
}

export default function AppointmentsScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    // Mock data - replace with actual API calls
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        professional: {
          id: 'prof1',
          name: 'Sofia Martinez',
          specialty: 'Hair Stylist',
          avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          phone: '+1 (555) 123-4567',
        },
        date: '2024-01-20',
        time: '2:00 PM',
        status: 'upcoming',
        location: 'Downtown Salon, 123 Main St',
        notes: 'Balayage treatment and cut',
        canCancel: true,
        canReschedule: true,
      },
      {
        id: '2',
        professional: {
          id: 'prof2',
          name: 'Miguel Rodriguez',
          specialty: 'Electrician',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          phone: '+1 (555) 987-6543',
        },
        date: '2024-01-25',
        time: '10:00 AM',
        status: 'upcoming',
        location: 'Your Home',
        notes: 'Kitchen outlet installation',
        canCancel: true,
        canReschedule: false,
      },
      {
        id: '3',
        professional: {
          id: 'prof3',
          name: 'Ana Gutierrez',
          specialty: 'Personal Trainer',
          avatar: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          phone: '+1 (555) 456-7890',
        },
        date: '2024-01-15',
        time: '6:00 PM',
        status: 'completed',
        location: 'FitLife Gym, 456 Oak Ave',
        notes: 'Personal training session',
        canCancel: false,
        canReschedule: false,
      },
      {
        id: '4',
        professional: {
          id: 'prof4',
          name: 'Carlos Mendez',
          specialty: 'Plumber',
          avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          phone: '+1 (555) 321-0987',
        },
        date: '2024-01-10',
        time: '9:00 AM',
        status: 'cancelled',
        location: 'Your Home',
        notes: 'Bathroom pipe repair',
        canCancel: false,
        canReschedule: false,
      },
    ];
    
    setAppointments(mockAppointments);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: () => {
            setAppointments(appointments.map(apt => 
              apt.id === appointmentId 
                ? { ...apt, status: 'cancelled' as const }
                : apt
            ));
          }
        },
      ]
    );
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    router.push(`/appointment/book?reschedule=${appointmentId}`);
  };

  const handleCallProfessional = (phone: string) => {
    // In a real app, you would use Linking.openURL(`tel:${phone}`)
    Alert.alert('Call Professional', `Would call ${phone}`);
  };

  const handleMessageProfessional = (professionalId: string) => {
    // Navigate to messaging screen
    Alert.alert('Message', 'Messaging feature coming soon');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#10B981';
      case 'completed':
        return '#6B7280';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <CalendarIcon size={16} color="#10B981" />;
      case 'completed':
        return <CheckCircle size={16} color="#6B7280" />;
      case 'cancelled':
        return <X size={16} color="#EF4444" />;
      default:
        return <CalendarIcon size={16} color="#6B7280" />;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (selectedTab === 'upcoming') {
      return apt.status === 'upcoming';
    } else {
      return apt.status === 'completed' || apt.status === 'cancelled';
    }
  });

  const renderAppointment = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.professionalInfo}>
          <Image 
            source={{ uri: appointment.professional.avatar }} 
            style={styles.professionalAvatar} 
          />
          <View style={styles.professionalDetails}>
            <Text style={styles.professionalName}>
              {appointment.professional.name}
            </Text>
            <Text style={styles.professionalSpecialty}>
              {appointment.professional.specialty}
            </Text>
          </View>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(appointment.status)}20` }]}>
          {getStatusIcon(appointment.status)}
          <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <CalendarIcon size={16} color="#9CA3AF" />
          <Text style={styles.detailText}>
            {new Date(appointment.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color="#9CA3AF" />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={16} color="#9CA3AF" />
          <Text style={styles.detailText}>{appointment.location}</Text>
        </View>
        
        {appointment.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>{appointment.notes}</Text>
          </View>
        )}
      </View>

      {appointment.status === 'upcoming' && (
        <View style={styles.appointmentActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCallProfessional(appointment.professional.phone)}
          >
            <Phone size={16} color="#667eea" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleMessageProfessional(appointment.professional.id)}
          >
            <MessageCircle size={16} color="#667eea" />
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>
          
          {appointment.canReschedule && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleRescheduleAppointment(appointment.id)}
            >
              <CalendarIcon size={16} color="#667eea" />
              <Text style={styles.actionButtonText}>Reschedule</Text>
            </TouchableOpacity>
          )}
          
          {appointment.canCancel && (
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleCancelAppointment(appointment.id)}
            >
              <X size={16} color="#EF4444" />
              <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
          onPress={() => setSelectedTab('past')}
        >
          <Text style={[styles.tabText, selectedTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <ScrollView style={styles.appointmentsList} showsVerticalScrollIndicator={false}>
        {filteredAppointments.length > 0 ? (
          <View style={styles.appointmentsContainer}>
            {filteredAppointments.map(renderAppointment)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <CalendarIcon size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>
              {selectedTab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
            </Text>
            <Text style={styles.emptyStateText}>
              {selectedTab === 'upcoming' 
                ? 'Book your first appointment with a professional'
                : 'Your completed and cancelled appointments will appear here'
              }
            </Text>
            {selectedTab === 'upcoming' && (
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => router.push('/(tabs)/search')}
              >
                <Text style={styles.bookButtonText}>Find Professionals</Text>
              </TouchableOpacity>
            )}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
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
  appointmentsList: {
    flex: 1,
  },
  appointmentsContainer: {
    padding: 20,
    gap: 16,
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  },
  professionalName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  professionalSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  appointmentDetails: {
    gap: 12,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    flex: 1,
  },
  notesContainer: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  notesLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  appointmentActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
  },
  cancelButton: {
    backgroundColor: '#FEE2E2',
  },
  cancelButtonText: {
    color: '#EF4444',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  bookButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});