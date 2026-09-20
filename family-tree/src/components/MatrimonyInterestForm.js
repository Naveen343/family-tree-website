import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useSubmitMatrimonyInterest } from "../hooks/useMatrimonyInterests";

const emptyForm = {
  full_name: "",
  age: "",
  gender: "",
  branch: "",
  education: "",
  occupation: "",
  location: "",
  about: "",
  contact_phone: "",
  contact_email: "",
};

const inputClasses =
  "w-full bg-[#16202B] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary";

export default function MatrimonyInterestForm() {
  const [form, setForm] = useState(emptyForm);
  const submit = useSubmitMatrimonyInterest();
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit.mutateAsync({
        ...form,
        age: form.age ? parseInt(form.age, 10) : null,
        gender: form.gender || null,
      });
      setSubmitted(true);
    } catch {
      // error surfaced via submit.isError below
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#1E2A36] border border-white/5 rounded-2xl p-10 text-center max-w-xl mx-auto">
        <CheckCircle2 className="mx-auto mb-4 text-secondary" size={40} />
        <h3 className="text-xl font-heading font-semibold text-white mb-2">Thank you!</h3>
        <p className="text-gray-300">
          Your details have been shared privately with the family committee. Someone will reach
          out to you directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1E2A36] border border-white/5 rounded-2xl p-6 md:p-8 max-w-xl mx-auto space-y-4"
    >
      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">Full Name *</label>
        <input className={inputClasses} value={form.full_name} onChange={set("full_name")} required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Age</label>
          <input type="number" className={inputClasses} value={form.age} onChange={set("age")} />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Gender</label>
          <select className={inputClasses} value={form.gender} onChange={set("gender")}>
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">Family Branch</label>
        <input
          className={inputClasses}
          value={form.branch}
          onChange={set("branch")}
          placeholder="e.g. Valiakalam, Therampu, Ariyappally…"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Education</label>
          <input className={inputClasses} value={form.education} onChange={set("education")} />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Occupation</label>
          <input className={inputClasses} value={form.occupation} onChange={set("occupation")} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">Location</label>
        <input className={inputClasses} value={form.location} onChange={set("location")} />
      </div>

      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">About you</label>
        <textarea className={inputClasses} rows={3} value={form.about} onChange={set("about")} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Phone *</label>
          <input className={inputClasses} value={form.contact_phone} onChange={set("contact_phone")} required />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Email</label>
          <input type="email" className={inputClasses} value={form.contact_email} onChange={set("contact_email")} />
        </div>
      </div>

      {submit.isError && (
        <p className="text-red-400 text-sm">
          Something went wrong submitting your details. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={submit.isPending}
        className="w-full bg-secondary text-[#16202B] font-semibold px-4 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {submit.isPending ? "Submitting…" : "Submit Privately"}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Your details are shared only with the family committee — never published publicly.
      </p>
    </form>
  );
}
