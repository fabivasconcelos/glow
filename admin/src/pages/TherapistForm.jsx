import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TherapistForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "male",
    professional_title: "",
    professional_website: "",
    contact_email: "",
    years_experience: "",
    education_background: "",
    professional_bio: "",
    anamnesis_category_ids: [],
    specialized_skill_expertise: "",
    unique_therapeutic_approach: "",
    demographic_specialty: "",
    outcome_expertise: "",
    unique_background_perspective: "",
    additional_differentiator_1: "",
    additional_differentiator_2: "",
    additional_differentiator_3: "",
    hands_on_approach: false,
    esoteric_frameworks: false,
    esoteric_frameworks_details: "",
    remote_sessions: false,
    in_person_sessions: false,
    geographic_location: "",
    session_length_minutes: "",
    recommended_frequency: "",
    pricing_tier: "Introductory (under $200)",
    additional_information: "",
    specialization_ids: [],
    specialized_demographic_ids: [],
    language_ids: [],
    specialization_other: "",
    specialized_demographic_other: "",
    language_other: "",
    profile_picture: null,
    intro_video: null,
  });

  const [specializations, setSpecializations] = useState([]);
  const [demographics, setDemographics] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [anamnesisCategories, setAnamnesisCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [otherIds, setOtherIds] = useState({ specialization: null, demographic: null, language: null });

  useEffect(() => {
    fetchOptions();
    if (id) {
      fetchTherapist();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchOptions = async () => {
    const [specRes, demoRes, langRes, anaRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/specializations`),
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/specialized-demographics`),
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/languages`),
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories`),
    ]);
    setSpecializations(specRes.data);
    setDemographics(demoRes.data);
    setLanguages(langRes.data);
    setAnamnesisCategories(anaRes.data);

    // Capturar os IDs dos campos "Other"
    setOtherIds({
      specialization: specRes.data.find((s) => s.name.toLowerCase() === "other")?.id || null,
      demographic: demoRes.data.find((d) => d.name.toLowerCase() === "other")?.id || null,
      language: langRes.data.find((l) => l.name.toLowerCase() === "other")?.id || null,
    });
  };

  const fetchTherapist = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/therapists/${id}`
      );
      setFormData({
        ...formData,
        ...data,
        anamnesis_category_ids: data.anamnesis_categories?.map((item) => item.id) || [],
        specialization_ids: data.specializations?.map((item) => item.id ?? otherIds.specialization).filter(Boolean) || [],
        specialized_demographic_ids: data.specialized_demographics?.map((item) => item.id ?? otherIds.demographic).filter(Boolean) || [],
        language_ids: data.languages?.map((item) => item.id ?? otherIds.language).filter(Boolean) || [],
        specialization_other: data.specializations?.find((item) => item.pivot?.other_text)?.pivot?.other_text || "",
        specialized_demographic_other: data.specialized_demographics?.find((item) => item.pivot?.other_text)?.pivot?.other_text || "",
        language_other: data.languages?.find((item) => item.pivot?.other_text)?.pivot?.other_text || "",
      });
      setOtherSelected({
        specialization: !!data.specializations?.find((item) => item.pivot?.other_text),
        demographic: !!data.specialized_demographics?.find((item) => item.pivot?.other_text),
        language: !!data.languages?.find((item) => item.pivot?.other_text),
      });
    } catch (error) {
      console.error("Erro ao carregar terapeuta:", error);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelect = (e, field) => {
    const value = parseInt(e.target.value);
    if (formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: formData[field].filter((v) => v !== value),
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => {
          form.append(`${key}[]`, item);
        });
      } else if (typeof formData[key] === "boolean") {
        form.append(key, formData[key] ? 1 : 0); // <-- AQUI: transforma booleano em 1 ou 0
      } else if (key === "profile_picture" || key === "intro_video") {
        if (formData[key] instanceof File) {
          form.append(key, formData[key]);
        }
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      if (id) {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/therapists/${id}`,
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/therapists`,
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      setSuccessMessage("Therapist saved successfully! ✅");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/therapists");
      }, 3000);
    } catch (error) {
      console.error("Erro ao salvar terapeuta:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {id ? "Edit Therapist" : "New Therapist"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6 text-left">
              Basic Information
            </h2>
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            {/* Professional Title */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Professional Title
              </label>
              <input
                type="text"
                name="professional_title"
                value={formData.professional_title}
                onChange={handleChange}
                placeholder="Professional Title"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            {/* Gender */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {/* Professional Website */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Professional Website
              </label>
              <input
                type="url"
                name="professional_website"
                value={formData.professional_website}
                onChange={handleChange}
                placeholder="Professional Website"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            {/* Contact Email */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Contact Email
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="Contact Email"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            {/* Years Experience */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Years Experience
              </label>
              <input
                type="number"
                name="years_experience"
                value={formData.years_experience}
                onChange={handleChange}
                placeholder="Years Experience"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            {/* Education Background */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Education Background
              </label>
              <textarea
                name="education_background"
                value={formData.education_background}
                onChange={handleChange}
                placeholder="Education Background"
                className="w-full p-3 border rounded-lg"
                rows="3"
              />
            </div>
            {/* Professional Bio */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Professional Bio
              </label>
              <textarea
                name="professional_bio"
                value={formData.professional_bio}
                onChange={handleChange}
                placeholder="Professional Bio"
                className="w-full p-3 border rounded-lg"
                rows="3"
              />
            </div>
            {/* Primary Focus (multiselect) */}
            <div>
              <label className="block text-gray-700">Primary Focus</label>
              <div className="grid grid-cols-2 gap-2">
                {anamnesisCategories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={cat.id}
                      checked={formData.anamnesis_category_ids.includes(cat.id)}
                      onChange={(e) =>
                        handleMultiSelect(e, "anamnesis_category_ids")
                      }
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* 📤 Uploads */}
            <div>
              <label className="block text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="profile_picture"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Intro Video</label>
              <input
                type="file"
                name="intro_video"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-left">
              Specific Differentiators
            </h2>
            {/* 🌟 Specific Differentiators */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Specialized Skill/Expertise
              </label>
              <input
                type="text"
                name="specialized_skill_expertise"
                value={formData.specialized_skill_expertise}
                onChange={handleChange}
                placeholder="Specialized Skill/Expertise"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Unique Therapeutic Approach
              </label>
              <input
                type="text"
                name="unique_therapeutic_approach"
                value={formData.unique_therapeutic_approach}
                onChange={handleChange}
                placeholder="Unique Therapeutic Approach"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Demographic Specialty
              </label>
              <input
                type="text"
                name="demographic_specialty"
                value={formData.demographic_specialty}
                onChange={handleChange}
                placeholder="Demographic Specialty"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Outcome Expertise
              </label>
              <input
                type="text"
                name="outcome_expertise"
                value={formData.outcome_expertise}
                onChange={handleChange}
                placeholder="Outcome Expertise"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Unique Background/Perspective
              </label>
              <input
                type="text"
                name="unique_background_perspective"
                value={formData.unique_background_perspective}
                onChange={handleChange}
                placeholder="Unique Background/Perspective"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Additional Differentiator 1
              </label>
              <input
                type="text"
                name="additional_differentiator_1"
                value={formData.additional_differentiator_1}
                onChange={handleChange}
                placeholder="Additional Differentiator 1"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Additional Differentiator 2
              </label>
              <input
                type="text"
                name="additional_differentiator_2"
                value={formData.additional_differentiator_2}
                onChange={handleChange}
                placeholder="Additional Differentiator 2"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Additional Differentiator 3
              </label>
              <input
                type="text"
                name="additional_differentiator_3"
                value={formData.additional_differentiator_3}
                onChange={handleChange}
                placeholder="Additional Differentiator 3"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-left">
              Specializations & Skills (select all that apply)
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {specializations.map((spec) => (
                <label key={spec.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={spec.id}
                    checked={formData.specialization_ids.includes(spec.id)}
                    onChange={(e) => handleMultiSelect(e, "specialization_ids")}
                  />
                  <span>{spec.name}</span>
                </label>
              ))}
            </div>

            {/* Campo para digitar o "Other" */}
            {otherIds.specialization && formData.specialization_ids.includes(otherIds.specialization) && (
              <input
                type="text"
                name="specialization_other"
                value={formData.specialization_other}
                onChange={handleChange}
                placeholder="Please specify Other Specialization"
                className="w-full p-3 border rounded-lg mt-2"
              />
            )}

            <h2 className="text-2xl font-semibold mb-6 text-left">
              Specialized Demographics (select all that apply)
            </h2>
            {/* Specialized Demographics */}
            <div className="grid grid-cols-2 gap-2">
              {demographics.map((demo) => (
                <label key={demo.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={demo.id}
                    checked={formData.specialized_demographic_ids.includes(demo.id)}
                    onChange={(e) => handleMultiSelect(e, "specialized_demographic_ids")}
                  />
                  <span>{demo.name}</span>
                </label>
              ))}
            </div>

            {/* Campo para digitar o "Other" */}
            {otherIds.demographic && formData.specialized_demographic_ids.includes(otherIds.demographic) && (
              <input
                type="text"
                name="specialized_demographic_other"
                value={formData.specialized_demographic_other}
                onChange={handleChange}
                placeholder="Please specify Other Demographic"
                className="w-full p-3 border rounded-lg mt-2"
              />
            )}

            <h2 className="text-2xl font-semibold mb-6 text-left">
              Session Details
            </h2>
            <div className="flex space-x-8 items-center">
              {/* 🪬 Session Details */}
              <div className="flex space-x-4 items-center">
                <input
                  type="checkbox"
                  name="hands_on_approach"
                  checked={formData.hands_on_approach}
                  onChange={handleChange}
                />
                <label>
                  Are your therapeutic approaches hands-on/include appropriate
                  physical touch?
                </label>
              </div>
              <div className="flex space-x-4 items-center">
                <input
                  type="checkbox"
                  name="esoteric_frameworks"
                  checked={formData.esoteric_frameworks}
                  onChange={handleChange}
                />
                <label>
                  Do you incorporate esoteric or alternative frameworks? If yes,
                  please specify:
                </label>
              </div>
            </div>
            {/* Condicional: mostrar o campo detalhes se usar esoteric frameworks */}
            {formData.esoteric_frameworks && (
              <textarea
                name="esoteric_frameworks_details"
                value={formData.esoteric_frameworks_details}
                onChange={handleChange}
                placeholder="Describe the esoteric frameworks"
                className="w-full p-3 border rounded-lg"
                rows="3"
              />
            )}

            <h2 className="text-2xl font-semibold mb-6 text-left">
              Session Information
            </h2>
            {/* 📍 Session Information */}
            <div className="flex space-x-8 items-center">
              {/* Remote Sessions */}
              <div className="flex space-x-4 items-center">
                <input
                  type="checkbox"
                  name="remote_sessions"
                  checked={formData.remote_sessions}
                  onChange={handleChange}
                />
                <label>Remote Sessions?</label>
              </div>
              {/* In-person Sessions */}
              <div className="flex space-x-4 items-center">
                <input
                  type="checkbox"
                  name="in_person_sessions"
                  checked={formData.in_person_sessions}
                  onChange={handleChange}
                />
                <label>In-person Sessions?</label>
              </div>
            </div>
            {/* Condicional: mostrar o campo detalhes se usar in_person_sessions */}
            {formData.in_person_sessions && (
              <textarea
                name="geographic_location"
                value={formData.geographic_location}
                onChange={handleChange}
                placeholder="Geographic Location for In-person Sessions"
                className="w-full p-3 border rounded-lg"
                rows="3"
              />
            )}

            <h2 className="text-2xl font-semibold mb-6 text-left">
              Session Structure
            </h2>
            {/* ⏱️ Session Structure */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Session Length (minutes)
              </label>
              <input
                type="number"
                name="session_length_minutes"
                value={formData.session_length_minutes}
                onChange={handleChange}
                placeholder="Session Length (minutes)"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Recommended Frequency (ex: weekly, bi-weekly, monthly)
              </label>
              <input
                type="text"
                name="recommended_frequency"
                value={formData.recommended_frequency}
                onChange={handleChange}
                placeholder="Recommended Frequency (ex: weekly, bi-weekly)"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Pricing
              </label>
              <select
                name="pricing_tier"
                value={formData.pricing_tier}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="Premium ($500+)">Premium ($500+)</option>
                <option value="Advanced ($300-$499)">
                  Advanced ($300-$499)
                </option>
                <option value="Standard ($200-$299)">
                  Standard ($200-$299)
                </option>
                <option value="Introductory (under $200)">
                  Introductory (under $200)
                </option>
              </select>
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-left">
              Languages (select all that apply)
            </h2>
            {/* Languages */}
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <label key={lang.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={lang.id}
                    checked={formData.language_ids.includes(lang.id)}
                    onChange={(e) => handleMultiSelect(e, "language_ids")}
                  />
                  <span>{lang.name}</span>
                </label>
              ))}
            </div>

            {/* Campo para digitar o "Other" */}
            {otherIds.language && formData.language_ids.includes(otherIds.language) && (
              <input
                type="text"
                name="language_other"
                value={formData.language_other}
                onChange={handleChange}
                placeholder="Please specify Other Language"
                className="w-full p-3 border rounded-lg mt-2"
              />
            )}
            {/* 📑 Additional Information */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Additional Information
              </label>
              <textarea
                name="additional_information"
                value={formData.additional_information}
                onChange={handleChange}
                placeholder="Additional Information"
                className="w-full p-3 border rounded-lg"
                rows="3"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Plan</label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="standard">Standard</option>
                <option value="plus">Plus</option>
              </select>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Save Therapist
            </button>
            {successMessage && (
              <div className="text-green-600 font-semibold text-center mt-2">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TherapistForm;