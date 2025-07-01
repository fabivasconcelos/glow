import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const TherapistView = () => {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTherapist();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchTherapist = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/therapists/${id}`
      );
      setTherapist(data);
    } catch (error) {
      console.error("Erro ao buscar terapeuta:", error);
    }
  };

  if (!therapist) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Therapist Details</h2>

          <div className="space-y-4 text-gray-800">
            <Info label="Full Name" value={therapist.full_name} />
            <Info label="Professional Title" value={therapist.professional_title} />
            <Info label="Gender" value={therapist.gender} />
            <Info label="Email" value={therapist.contact_email} />
            <Info label="Website" value={therapist.professional_website} />
            <Info label="Years Experience" value={therapist.years_experience} />
            <Info label="Education" value={therapist.education_background} />
            <Info label="Professional Bio" value={therapist.professional_bio} />
            <Info
              label="Anamnesis Categories"
              value={therapist.anamnesis_categories?.map(c => c.name).join(", ")}
            />
            <Info label="Specialized Skill" value={therapist.specialized_skill_expertise} />
            <Info label="Unique Approach" value={therapist.unique_therapeutic_approach} />
            <Info label="Demographic Specialty" value={therapist.demographic_specialty} />
            <Info label="Outcome Expertise" value={therapist.outcome_expertise} />
            <Info label="Unique Perspective" value={therapist.unique_background_perspective} />

            {/* Lista de especializações e demografias */}
            <Info
              label="Specializations"
              value={therapist.specializations?.map(s => s.name).join(", ")}
            />
            <Info
              label="Specialized Demographics"
              value={therapist.specialized_demographics?.map(d => d.name).join(", ")}
            />
            <Info label="Languages" value={therapist.languages?.map(l => l.name).join(", ")} />

            <Info label="Session Length" value={`${therapist.session_length_minutes} min`} />
            <Info label="Recommended Frequency" value={therapist.recommended_frequency} />
            <Info label="Pricing Tier" value={therapist.pricing_tier} />
            <Info label="Remote Sessions" value={therapist.remote_sessions ? "Yes" : "No"} />
            <Info label="In-Person Sessions" value={therapist.in_person_sessions ? "Yes" : "No"} />
            {therapist.in_person_sessions && (
              <Info label="Location" value={therapist.geographic_location} />
            )}
            <Info label="Status" value={therapist.status} />
            <Info label="Plan" value={therapist.plan} />

            {/* Mídias */}
            <div>
              <p className="font-semibold mb-1">Profile Picture</p>
              {therapist.profile_picture ? (
                <img
                  src={therapist.profile_picture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border"
                />
              ) : (
                <p className="text-sm text-gray-500">No profile picture uploaded</p>
              )}
            </div>

            <div>
              <p className="font-semibold mb-1">Intro Video</p>
              {therapist.intro_video ? (
                <video controls className="w-full max-w-md mt-2">
                  <source src={therapist.intro_video} />
                  Your browser does not support video.
                </video>
              ) : (
                <p className="text-sm text-gray-500">No video uploaded</p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to={`/therapists`}
              className="text-blue-600 hover:underline font-medium"
            >
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm font-semibold text-gray-600">{label}</p>
    <p className="text-lg">{value || <span className="text-gray-400">—</span>}</p>
  </div>
);

export default TherapistView;