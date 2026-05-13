import { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';

const deviceModels = {
  iPhone: [
    'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 Mini', 'iPhone 13',
    'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12 Mini', 'iPhone 12',
    'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
    'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
    'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7',
    'iPhone SE 2022', 'iPhone SE 2020',
  ],
  Samsung: [
    'Samsung S25 Ultra', 'Samsung S25+', 'Samsung S25',
    'Samsung S24 Ultra', 'Samsung S24+', 'Samsung S24',
    'Samsung S23 Ultra', 'Samsung S23+', 'Samsung S23',
    'Samsung S22 Ultra', 'Samsung S22+', 'Samsung S22',
    'Samsung S21 Ultra', 'Samsung S21+', 'Samsung S21',
    'Samsung Note 20 Ultra', 'Samsung Note 20',
    'Samsung Z Fold 6', 'Samsung Z Fold 5', 'Samsung Z Fold 4',
    'Samsung Z Flip 6', 'Samsung Z Flip 5', 'Samsung Z Flip 4',
    'Samsung A55', 'Samsung A54', 'Samsung A35',
  ],
  'Google Pixel': [
    'Google Pixel 9 Pro XL', 'Google Pixel 9 Pro', 'Google Pixel 9',
    'Google Pixel 8 Pro', 'Google Pixel 8',
    'Google Pixel 7 Pro', 'Google Pixel 7',
    'Google Pixel 6 Pro', 'Google Pixel 6', 'Google Pixel Fold',
  ],
};

const issueOptions = [
  'Liquid damage (water exposure)',
  'Physical deformation (bent chassis)',
  'External casing damage (e.g. housing, back cover)',
  'Internal components exposed',
  'Missing parts',
  'Does not power on',
  'Charging failure',
  'No display / screen issue',
  'None of the Above',
];

function StepNumber({ number }) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-sm">
      {number}
    </span>
  );
}

export default function PhoneRepairWebsite() {
  const EMAILJS_SERVICE_ID = 'service_1wa9vyt';
  const EMAILJS_TEMPLATE_ID = 'template_pmwf3ge';
  const EMAILJS_PUBLIC_KEY = 'mQKiiCgoC6RFAXqgb';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const models = useMemo(() => (brand ? deviceModels[brand] : []), [brand]);

  const toggleIssue = (issue) => {
    setSelectedIssues((current) =>
      current.includes(issue)
        ? current.filter((item) => item !== issue)
        : [...current, issue]
    );
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
    setModel('');
  };

  const handleSubmit = async () => {
    if (!name || !phone || !email || !brand || !model || selectedIssues.length === 0) {
      alert('Please complete all required fields before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          phone,
          email,
          brand,
          model,
          issues: selectedIssues.join(', '),
          details: details || 'No additional details provided',
          date: date || 'Not selected',
          time: time || 'Not selected',
        },
        EMAILJS_PUBLIC_KEY
      );

      alert('Booking submitted successfully! We will contact you soon.');
      setName('');
      setPhone('');
      setEmail('');
      setBrand('');
      setModel('');
      setSelectedIssues([]);
      setDetails('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('Failed to submit booking. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="bg-neutral-950 px-4 py-4 text-white shadow-lg sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              MobilePlus<span className="text-red-600"> Jindalee</span>
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:text-xs sm:tracking-[0.25em]">
              Mobile Phone Repair Shop
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.7fr_1fr] lg:gap-14 lg:px-8 lg:py-10">
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Book a Repair</h2>
          <p className="mt-2 text-base text-neutral-600 sm:text-lg">
            Fill in the details below and we'll take care of the rest.
          </p>

          <form className="mt-8 space-y-8 sm:mt-10">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <StepNumber number="1" />
                <h3 className="text-lg font-extrabold sm:text-xl">Your Information</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-md border border-neutral-300 px-4 py-3">
                  <span>👤</span>
                  <input
                    className="w-full outline-none"
                    placeholder="Full Name *"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>

                <label className="flex items-center gap-3 rounded-md border border-neutral-300 px-4 py-3">
                  <span>📞</span>
                  <input
                    className="w-full outline-none"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </label>

                <label className="flex items-center gap-3 rounded-md border border-neutral-300 px-4 py-3 md:col-span-2">
                  <span>✉️</span>
                  <input
                    className="w-full outline-none"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <StepNumber number="2" />
                <h3 className="text-lg font-extrabold sm:text-xl">Device Information</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-bold">Brand *</label>
                  <select
                    className="w-full rounded-md border border-neutral-300 px-4 py-3 outline-none focus:border-red-500"
                    value={brand}
                    onChange={handleBrandChange}
                  >
                    <option value="">Select Brand</option>
                    <option value="iPhone">iPhone</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Google Pixel">Google Pixel</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-bold">Model *</label>
                  <select
                    className="w-full rounded-md border border-neutral-300 px-4 py-3 outline-none focus:border-red-500 disabled:bg-neutral-100"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    disabled={!brand}
                  >
                    <option value="">Select Model</option>
                    {models.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <StepNumber number="3" />
                <h3 className="text-lg font-extrabold sm:text-xl">Select the Issue(s) *</h3>
                <span className="text-sm text-neutral-500">(You can choose multiple)</span>
              </div>

              <div className="space-y-3">
                {issueOptions.map((issue) => (
                  <label key={issue} className="flex cursor-pointer items-start gap-3 text-sm leading-6 sm:text-base">
                    <input
                      type="checkbox"
                      checked={selectedIssues.includes(issue)}
                      onChange={() => toggleIssue(issue)}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-red-600"
                    />
                    <span>{issue}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <StepNumber number="4" />
                <h3 className="text-lg font-extrabold sm:text-xl">Describe the Issue</h3>
                <span className="text-sm text-neutral-500">(Optional)</span>
              </div>

              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value.slice(0, 500))}
                className="h-28 w-full resize-none rounded-md border border-neutral-300 p-4 outline-none focus:border-red-500"
                placeholder="Please describe the issue in more detail..."
              />
              <div className="mt-1 text-right text-sm text-neutral-500">{details.length} / 500</div>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <StepNumber number="5" />
                <h3 className="text-lg font-extrabold sm:text-xl">Preferred Date & Time</h3>
                <span className="text-sm text-neutral-500">(Optional)</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-md border border-neutral-300 px-4 py-3">
                  <span>📅</span>
                  <input
                    type="date"
                    className="w-full outline-none"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </label>

                <label className="flex items-center gap-3 rounded-md border border-neutral-300 px-4 py-3">
                  <span>🕒</span>
                  <input
                    type="time"
                    className="w-full outline-none"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-red-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              <span>📅</span>
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          </form>
        </section>

        <aside className="h-fit rounded-3xl bg-neutral-50 p-5 shadow-sm ring-1 ring-neutral-100 sm:p-8 lg:sticky lg:top-8">
          <h3 className="text-xl font-extrabold sm:text-2xl">Booking Summary</h3>

          <div className="mt-7 space-y-5 text-sm">
            <div className="flex justify-between gap-6">
              <span className="text-neutral-600">Brand</span>
              <span className="font-semibold">{brand || '—'}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-neutral-600">Model</span>
              <span className="text-right font-semibold">{model || '—'}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-neutral-600">Selected Issues</span>
              <span className="max-w-48 text-right font-semibold">
                {selectedIssues.length ? selectedIssues.join(', ') : '—'}
              </span>
            </div>
          </div>

          <div className="my-7 h-px bg-neutral-200" />

          <div className="space-y-5 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Estimated Time</span>
              <span className="font-semibold">—</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Estimated Cost</span>
              <span className="font-semibold">—</span>
            </div>
          </div>

          <div className="my-7 h-px bg-neutral-200" />

          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <span>🛡️</span>
            </div>
            <div>
              <p className="font-extrabold">Your device is in safe hands.</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                We use high quality parts and professional tools.
              </p>
            </div>
          </div>
        </aside>
      </main>

      <footer className="bg-neutral-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-2xl font-black sm:text-3xl">Mobile<span className="text-red-600">Plus Jindalee</span></h3>
            <p className="mt-4 max-w-64 leading-7 text-neutral-300">
              Professional mobile phone repair services in Brisbane with expert technicians and quality parts.
            </p>
            <div className="mt-6 flex gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 font-bold">f</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 font-bold">◎</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 font-bold">G</span>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold">Services</h4>
            <div className="mt-5 space-y-3 text-neutral-300">
              <p>Screen Replacement</p>
              <p>Battery Replacement</p>
              <p>Water Damage Repair</p>
              <p>Charging Port Repair</p>
              <p>And More...</p>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold">Contact Us</h4>
            <div className="mt-5 space-y-4 text-neutral-300">
              <p className="flex gap-3"><span>📞</span> (07) 3844 2918</p>
              <p className="flex gap-3"><span>✉️</span> mobileplusdfo@gmail.com</p>
              <p className="flex gap-3"><span>📍</span> 16 Amazons Pl,<br />Jindalee QLD 4074</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-neutral-800 pt-5 text-center text-sm text-neutral-400">
          © 2026 MobilePluus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
