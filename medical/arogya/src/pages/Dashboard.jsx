// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Weight, 
  Calendar, 
  Pill, 
  FileText,
  TrendingUp,
  Clock,
  MapPin
} from "lucide-react";
// import heroImage from "@/assets/medical-hero.jpg";

const Dashboard = () => {
  const healthMetrics = [
    {
      icon: Heart,
      label: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      change: "+2%"
    },
    {
      icon: Activity,
      label: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      change: "-1%"
    },
    {
      icon: Thermometer,
      label: "Temperature",
      value: "98.6",
      unit: "°F",
      status: "normal",
      change: "0%"
    },
    {
      icon: Weight,
      label: "Weight",
      value: "165",
      unit: "lbs",
      status: "normal",
      change: "-0.5%"
    }
  ];

  const recentVisits = [
    {
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      status: "completed",
      location: "Downtown Medical Center"
    },
    {
      date: "2024-01-10",
      doctor: "Dr. Michael Chen",
      specialty: "General Practice",
      status: "completed",
      location: "Community Health Clinic"
    },
    {
      date: "2024-01-20",
      doctor: "Dr. Emily Davis",
      specialty: "Dermatology",
      status: "upcoming",
      location: "Specialist Medical Plaza"
    }
  ];

  const medications = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      remaining: 28,
      status: "active"
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      remaining: 15,
      status: "low"
    },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      remaining: 45,
      status: "active"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0">
         
        </div>
        <div className="relative px-8 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Welcome back, John!
          </h1>
          <p className="text-lg text-primary-foreground/90 mb-6">
            Your health dashboard is ready with the latest updates
          </p>
          <button 
            variant="secondary" 
            size="lg"
            className="shadow-medical"
          >
            <div className="w-4 h-4 mr-2" />
            Schedule Appointment
          </button>
        </div>
      </section>


    </div>
  );
};

export default Dashboard;