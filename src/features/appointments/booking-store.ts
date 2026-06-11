// d:\Physo\physiocare-plus\src\features\appointments\booking-store.ts

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration_minutes: number;
  is_home_service: boolean;
}

export interface Clinician {
  id: string;
  first_name: string;
  last_name: string;
  specialties: string[];
  bio: string;
  avatar_url: string;
  rating: number;
  reviews_count: number;
  availability: { [day: number]: string[] }; // day_of_week -> available time slots
}

export interface Appointment {
  id: string;
  patient_id: string;
  patient_name: string;
  patient_phone: string;
  service_id: string;
  clinician_id: string;
  appointment_date: string;
  start_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  is_home_visit: boolean;
  home_address?: string;
  symptoms: string;
  created_at: string;
}

// 1. High-Fidelity Mock Services Catalog
export const MOCK_SERVICES: Service[] = [
  {
    id: "serv-1",
    name: "Sports Injury Rehabilitation",
    slug: "sports-injury-rehab",
    description: "Specialized rehabilitation for athletes focusing on restoration of athletic performance, agility, and dynamic muscle tissue recovery.",
    price: 85.00,
    duration_minutes: 60,
    is_home_service: false
  },
  {
    id: "serv-2",
    name: "Manual Manipulation Therapy",
    slug: "manual-manipulation",
    description: "Hands-on diagnostic mobilization of joints, soft tissue releases, and alignment techniques to immediately reduce severe pain.",
    price: 95.00,
    duration_minutes: 45,
    is_home_service: false
  },
  {
    id: "serv-3",
    name: "Dry Needling Therapy",
    slug: "dry-needling",
    description: "Targeted clinical dry needling to release myofascial trigger points, reduce muscle knots, and restore localized range of motion.",
    price: 65.00,
    duration_minutes: 30,
    is_home_service: false
  },
  {
    id: "serv-4",
    name: "Geriatric Mobility Care",
    slug: "geriatric-care",
    description: "Gentle physical therapy aimed at enhancing balance, bone density, flexibility, and overall independent safe moving for elderly patients.",
    price: 75.00,
    duration_minutes: 60,
    is_home_service: true
  },
  {
    id: "serv-5",
    name: "Post-Operative Recovery Plan",
    slug: "post-op-recovery",
    description: "Comprehensive structured therapy paths for patients recovering from joint replacements, ligament repairs, or major bone surgeries.",
    price: 110.00,
    duration_minutes: 75,
    is_home_service: true
  },
  {
    id: "serv-6",
    name: "Home Visit Elite Physiotherapy",
    slug: "home-visit-physio",
    description: "Complete in-home therapeutic care including portable evaluation equipment, physical exercises, and clinical assessments right in your living room.",
    price: 145.00,
    duration_minutes: 90,
    is_home_service: true
  }
];

// 2. High-Fidelity Mock Clinicians Catalog
export const MOCK_CLINICIANS: Clinician[] = [
  {
    id: "clin-1",
    first_name: "Emma",
    last_name: "Stone",
    specialties: ["Sports Injury Rehab", "Manual Manipulation"],
    bio: "Dr. Emma Stone, PT, DPT, specializes in sports biomechanics and manual joint adjustment with over 8 years of clinical athletic support.",
    avatar_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    rating: 4.9,
    reviews_count: 142,
    availability: {
      1: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"], // Mon
      2: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"], // Tue
      3: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"], // Wed
      4: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"], // Thu
      5: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]  // Fri
    }
  }
];

// Initial state and helper class for central scheduling
export interface BookingState {
  selectedService: Service | null;
  selectedClinician: Clinician | null;
  selectedDate: string;
  selectedTimeSlot: string;
  patientName: string;
  patientPhone: string;
  isHomeVisit: boolean;
  homeAddress: string;
  symptoms: string;
}

export const INITIAL_BOOKING_STATE: BookingState = {
  selectedService: null,
  selectedClinician: null,
  selectedDate: "",
  selectedTimeSlot: "",
  patientName: "",
  patientPhone: "",
  isHomeVisit: false,
  homeAddress: "",
  symptoms: ""
};

// Global Store Wrapper (for persistent local sessions)
const STORAGE_KEY = "physiocare_appointments";

export function getStoredAppointments(): Appointment[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Return standard initial list if empty
    const initialList: Appointment[] = [
      {
        id: "appt-1",
        patient_id: "pat-1",
        patient_name: "John Doe",
        patient_phone: "+1 555-0123",
        service_id: "serv-1",
        clinician_id: "clin-1",
        appointment_date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
        start_time: "09:00",
        status: "confirmed",
        is_home_visit: false,
        symptoms: "Severe lower back strain and stiffness after weekend golf.",
        created_at: new Date().toISOString()
      },
      {
        id: "appt-2",
        patient_id: "pat-2",
        patient_name: "Alice Hill",
        patient_phone: "+1 555-9876",
        service_id: "serv-4",
        clinician_id: "clin-3",
        appointment_date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // In 2 days
        start_time: "10:00",
        status: "pending",
        is_home_visit: true,
        home_address: "123 Therapy Lane, Metro City",
        symptoms: "Requires muscle toning assistance post knee surgery.",
        created_at: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialList));
    return initialList;
  }
  return JSON.parse(stored);
}

export function saveAppointment(appt: Omit<Appointment, 'id' | 'created_at'>): Appointment {
  const list = getStoredAppointments();
  const newAppt: Appointment = {
    ...appt,
    id: `appt-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  list.push(newAppt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newAppt;
}

export function updateAppointmentStatus(id: string, status: Appointment['status']): Appointment[] {
  const list = getStoredAppointments();
  const updated = list.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
