import { Heart, Activity, Thermometer, Weight, Calendar, Pill, FileText, MapPin } from "lucide-react";

const Dashboard = () => {
  const healthMetrics = [
    { icon: Heart, label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", change: "+2%" },
    { icon: Activity, label: "Heart Rate", value: "72", unit: "bpm", status: "normal", change: "-1%" },
    { icon: Thermometer, label: "Temperature", value: "98.6", unit: "°F", status: "normal", change: "0%" },
    { icon: Weight, label: "Weight", value: "165", unit: "lbs", status: "normal", change: "-0.5%" }
  ];

  const recentVisits = [
    { date: "2024-01-15", doctor: "Dr. Sarah Johnson", specialty: "Cardiology", status: "completed", location: "Downtown Medical Center" },
    { date: "2024-01-10", doctor: "Dr. Michael Chen", specialty: "General Practice", status: "completed", location: "Community Health Clinic" },
    { date: "2024-01-20", doctor: "Dr. Emily Davis", specialty: "Dermatology", status: "upcoming", location: "Specialist Medical Plaza" }
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", remaining: 28, status: "active" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", remaining: 15, status: "low" },
    { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", remaining: 45, status: "active" }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Greeting Section */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl p-8 text-white text-center shadow-lg transform transition-transform hover:scale-105 duration-300">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, John!</h1>
        <p className="mb-4 text-lg opacity-90">Here’s your health dashboard with latest updates</p>
        <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-indigo-50 hover:scale-105 transition-transform duration-300">
          Schedule Appointment
        </button>
      </section>

      {/* Health Metrics */}
      <section>
        <h2 className="text-xl font-bold mb-4">Health Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {healthMetrics.map((metric, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer"
            >
              <metric.icon className="w-8 h-8 text-indigo-500 mb-2"/>
              <span className="text-gray-500">{metric.label}</span>
              <span className="text-xl font-bold">{metric.value} {metric.unit}</span>
              <span className={`mt-1 text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                {metric.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Medications */}
      <section>
        <h2 className="text-xl font-bold mb-4">Medications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead className="bg-indigo-100 text-left">
              <tr>
                <th className="p-3">Medicine</th>
                <th className="p-3">Dosage</th>
                <th className="p-3">Frequency</th>
                <th className="p-3">Remaining</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med, idx) => (
                <tr 
                  key={idx} 
                  className="border-t hover:bg-indigo-50 hover:scale-102 transform transition-transform duration-200 cursor-pointer"
                >
                  <td className="p-3">{med.name}</td>
                  <td className="p-3">{med.dosage}</td>
                  <td className="p-3">{med.frequency}</td>
                  <td className="p-3">{med.remaining}</td>
                  <td className={`p-3 font-semibold ${med.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {med.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Visits */}
      <section>
        <h2 className="text-xl font-bold mb-4">Recent Visits</h2>
        <div className="space-y-3">
          {recentVisits.map((visit, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center transform transition-transform hover:scale-102 hover:shadow-lg duration-300 cursor-pointer"
            >
              <div>
                <p className="font-semibold">{visit.doctor} - {visit.specialty}</p>
                <p className="text-gray-500 text-sm">{visit.location}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-700">{visit.date}</p>
                <p className={`${visit.status === 'completed' ? 'text-green-600' : 'text-orange-500'}`}>
                  {visit.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
