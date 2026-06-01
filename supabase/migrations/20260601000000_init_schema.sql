-- =====================================================================
-- DATABASE MIGRATION SCRIPT: PHYSICARE PLUS INITIAL SCHEMA
-- TARGET PLATFORM: SUPABASE POSTGRESQL (LOCAL DEVELOPMENT & PRODUCTION)
-- FILE PATH: supabase/migrations/20260601000000_init_schema.sql
-- =====================================================================

BEGIN;

-- ==========================================
-- 0. EXTENSIONS & CUSTOM TYPE DEFINITIONS
-- ==========================================

-- Enable standard UUID generator in the public schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define specific domain enums
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('patient', 'clinician', 'admin');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
        CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
    END IF;
END $$;

-- ==========================================
-- 1. UTILITY FUNCTIONS & AUTOMATED TRIGGERS
-- ==========================================

-- Trigger function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 2. PUBLIC TABLES CONFIGURATIONS
-- ==========================================

-- TABLE: USERS (Linked to Supabase Auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role DEFAULT 'patient'::user_role NOT NULL,
    phone VARCHAR(30),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- TABLE: PATIENTS (Extends clinical records for patients)
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
    date_of_birth DATE,
    gender VARCHAR(50),
    emergency_contact_name VARCHAR(150),
    emergency_contact_phone VARCHAR(30),
    blood_group VARCHAR(10),
    medical_allergies TEXT,
    chronic_conditions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- TABLE: SERVICES (Clinic treatments & wellness sessions)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0.00),
    duration_minutes INT DEFAULT 60 NOT NULL CHECK (duration_minutes > 0),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_home_service BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- TABLE: APPOINTMENTS (Booked clinic or home physical therapies)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE RESTRICT NOT NULL,
    clinician_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Clinician (role check enforced at action level)
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status appointment_status DEFAULT 'pending'::appointment_status NOT NULL,
    is_home_visit BOOLEAN DEFAULT FALSE NOT NULL,
    home_visit_address TEXT,
    home_visit_latitude DECIMAL(9,6),
    home_visit_longitude DECIMAL(9,6),
    home_visit_transit_fee NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK (home_visit_transit_fee >= 0.00),
    symptoms TEXT,
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Prevent clinician double-booking on same date and start_time
    CONSTRAINT unique_clinician_time_slot UNIQUE (clinician_id, appointment_date, start_time)
);

-- TABLE: REVIEWS (Verified feedback from patient visits)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE NOT NULL,
    approved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- TABLE: BLOGS (Medical research, tips, and articles)
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.users(id) ON DELETE RESTRICT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    meta_description VARCHAR(160) NOT NULL,
    featured_image_url TEXT,
    tags TEXT[],
    is_published BOOLEAN DEFAULT FALSE NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- TABLE: SETTINGS (Global clinic metrics, operating values, rates)
CREATE TABLE IF NOT EXISTS public.settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ==========================================
-- 3. TIMESTAMP TRIGGERS REGISTRATION
-- ==========================================

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 4. PERFORMANCE & FOREIGN KEY INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_patients_dob ON public.patients(date_of_birth);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_clinician ON public.appointments(clinician_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date, start_time);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(is_published, published_at desc);

-- ==========================================
-- 5. AUTOMATED SUPABASE SIGNUP PROFILE SYNC
-- ==========================================

-- Create internal sync handler
CREATE OR REPLACE FUNCTION public.handle_new_supabase_user()
RETURNS TRIGGER AS $$
DECLARE
    user_metadata JSONB := NEW.raw_user_meta_data;
    v_role public.user_role := 'patient'::public.user_role;
    v_first_name VARCHAR(100);
    v_last_name VARCHAR(100);
BEGIN
    -- Dynamically read role metadata scope, checking defaults
    IF user_metadata ? 'role' THEN
        v_role := (user_metadata->>'role')::public.user_role;
    END IF;

    v_first_name := COALESCE(user_metadata->>'first_name', 'Guest');
    v_last_name := COALESCE(user_metadata->>'last_name', 'User');

    -- Insert profile metadata
    INSERT INTO public.users (id, email, first_name, last_name, role, phone, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        v_first_name,
        v_last_name,
        v_role,
        user_metadata->>'phone',
        user_metadata->>'avatar_url'
    );

    -- If profile role is patient, automatically extend into patients table
    IF v_role = 'patient'::public.user_role THEN
        INSERT INTO public.patients (id)
        VALUES (NEW.id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind handler trigger on external authentication insert event
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_supabase_user();

-- ==========================================
-- 6. ROW LEVEL SECURITY (RLS) & PRIVACY POLICIES
-- ==========================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- users policies
CREATE POLICY "Public users can view metadata profiles of clinicians" 
    ON public.users FOR SELECT 
    USING (role = 'clinician'::user_role OR id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'::user_role
    ));

CREATE POLICY "Users can edit their own profiles" 
    ON public.users FOR UPDATE 
    USING (id = auth.uid());

-- patients policies
CREATE POLICY "Patients can view/edit their own medical profile" 
    ON public.patients FOR ALL 
    USING (id = auth.uid()) 
    WITH CHECK (id = auth.uid());

CREATE POLICY "Clinicians and Admins can view patient records" 
    ON public.patients FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('clinician'::user_role, 'admin'::user_role)
    ));

-- services policies
CREATE POLICY "Services are visible to everyone" 
    ON public.services FOR SELECT 
    USING (is_active = TRUE);

CREATE POLICY "Only Admins can modify services" 
    ON public.services FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'::user_role
    ));

-- appointments policies
CREATE POLICY "Patients can manage their own appointments" 
    ON public.appointments FOR ALL 
    USING (patient_id = auth.uid());

CREATE POLICY "Clinicians and Admins can manage all appointments" 
    ON public.appointments FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('clinician'::user_role, 'admin'::user_role)
    ));

-- reviews policies
CREATE POLICY "Approved reviews are visible to the public" 
    ON public.reviews FOR SELECT 
    USING (is_approved = TRUE);

CREATE POLICY "Patients can write review logs of their visits" 
    ON public.reviews FOR INSERT 
    WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Only Admins can approve reviews" 
    ON public.reviews FOR UPDATE 
    USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'::user_role
    ));

-- blogs policies
CREATE POLICY "Published blogs are readable by public" 
    ON public.blogs FOR SELECT 
    USING (is_published = TRUE);

CREATE POLICY "Clinicians and Admins can manage blogs" 
    ON public.blogs FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('clinician'::user_role, 'admin'::user_role)
    ));

-- settings policies
CREATE POLICY "Settings are readable by the public website context" 
    ON public.settings FOR SELECT 
    USING (TRUE);

CREATE POLICY "Only Admins can edit global settings keys" 
    ON public.settings FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'::user_role
    ));

COMMIT;
