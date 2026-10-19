import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  MapPin,
  Globe,
  Headphones,
  Store,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TikTokIcon, LinkedinIcon } from '../components/SocialIcons';

export default function ContactPage() {
  // FAQ accordion state (first question open by default)
  const [openFaq, setOpenFaq] = useState(0);

  // Contact form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' });

  const faqs = [
    {
      q: '1. What does AWAI Nepal specialize in?',
      a: 'AWAI specializes in manufacturing high-quality electronic appliances, including air conditioners (ACs), fans, refrigerators, and other home and office electronics.',
    },
    {
      q: '2. Where is AWAI Nepal located?',
      a: 'Gaurishankar Marg, Kuleshwor, Kathmandu, Nepal.',
    },
    {
      q: '3. Are your products energy efficient?',
      a: 'AWAI offers appliances designed to support efficient everyday performance. Refer to individual product specifications for energy ratings.',
    },
    {
      q: '4. Do your products come with a warranty?',
      a: 'Warranty coverage varies by product. Please check the product warranty details or contact our team for assistance.',
    },
    {
      q: '5. Do you offer discounts on bulk purchases?',
      a: 'Contact our sales team for information about bulk orders, product availability, and applicable offers.',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus.state !== 'idle') {
      setFormStatus({ state: 'idle', message: '' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      setFormStatus({ state: 'error', message: 'Please enter your full name.' });
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      setFormStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    if (!formData.phone.trim()) {
      setFormStatus({ state: 'error', message: 'Please enter your contact phone number.' });
      return;
    }
    if (!formData.subject) {
      setFormStatus({ state: 'error', message: 'Please select a subject.' });
      return;
    }
    if (!formData.message.trim()) {
      setFormStatus({ state: 'error', message: 'Please enter your message.' });
      return;
    }

    // Success response (Demo submission)
    setFormStatus({
      state: 'success',
      message: 'Thank you! Your inquiry has been received. Our team will contact you shortly.',
    });

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="w-full bg-[#FAFAFB]">
      {/* 1. Contact Hero Section */}
      <section className="w-full bg-[#FFFFFF] border-b border-[#E5E9ED]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-5 sm:py-6">
          <span className="text-[11px] font-bold tracking-[0.16em] text-[#E91E32] uppercase mb-1 block">
            WE'RE HERE TO HELP
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111D27] tracking-tight mb-1.5">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-[#737D87] font-normal leading-relaxed max-w-xl">
            Questions about AWAI appliances? Our team is ready to help.
          </p>
        </div>
      </section>

      {/* 2. Main Two-Column Content Layout */}
      <section className="w-full py-6 sm:py-8">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
            {/* Left Column (Wider: 7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Card 1: Frequently Asked Questions */}
              <div className="bg-white border border-[#E5E9ED] rounded-xl p-5 sm:p-6 shadow-xs">
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#E91E32] uppercase mb-1 block">
                  INFORMATION QUESTIONS
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#111D27] tracking-tight mb-3.5">
                  Frequently Asked Questions
                </h2>

                {/* Accordion List */}
                <div className="divide-y divide-[#F1F5F9]">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div key={index} className="py-2.5 sm:py-3 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="w-full flex items-center justify-between text-left gap-3 cursor-pointer focus:outline-none group"
                          aria-expanded={isOpen}
                        >
                          <span
                            className={`text-xs sm:text-sm font-semibold transition-colors ${
                              isOpen
                                ? 'text-[#E91E32]'
                                : 'text-[#17212B] group-hover:text-[#E91E32]'
                            }`}
                          >
                            {faq.q}
                          </span>
                          <span className="shrink-0 text-[#737D87]">
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-[#E91E32]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#94A3B8] group-hover:text-[#E91E32]" />
                            )}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="pt-2 text-xs text-[#525E6B] leading-relaxed pr-4 animate-in fade-in duration-200">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: Our Location & Map */}
              <div className="bg-white border border-[#E5E9ED] rounded-xl p-5 sm:p-6 shadow-xs">
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#E91E32] uppercase mb-1 block">
                  OUR LOCATION
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#111D27] tracking-tight mb-2">
                  Find Us
                </h2>

                <div className="flex items-start gap-2 text-xs text-[#525E6B] mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#E91E32] shrink-0 mt-0.5" />
                  <span className="font-medium text-[#17212B]">
                    Gaurishankar Marg, Kuleshwor, Kathmandu, Nepal
                  </span>
                </div>

                {/* Embedded Map Container */}
                <div className="relative rounded-lg overflow-hidden border border-[#E5E9ED] bg-[#F1F5F9] shadow-2xs group">
                  <a
                    href="https://maps.google.com/?q=Akash+International+Gaurishankar+Marg+Kathmandu+Nepal"
                    target="_blank"
                    rel="noreferrer"
                    className="block relative overflow-hidden"
                    title="Open Gaurishankar Marg, Kuleshwor location in Google Maps"
                  >
                    <img
                      src="/images/contact-map.png"
                      alt="Map Location - Akash International / AWAI Nepal, Gaurishankar Marg, Kuleshwor, Kathmandu"
                      className="w-full h-52 sm:h-56 object-cover object-top group-hover:scale-101 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white/95 px-2.5 py-1 rounded text-[10px] font-semibold text-[#111D27] shadow-xs border border-[#E5E9ED] hover:bg-[#E91E32] hover:text-white transition-colors">
                      Open in Maps ↗
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Card 1: Contact Form */}
              <div className="bg-white border border-[#E5E9ED] rounded-xl p-5 sm:p-6 shadow-xs">
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#E91E32] uppercase mb-1 block">
                  GET IN TOUCH
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#111D27] tracking-tight mb-1">
                  Contact Our Team
                </h2>
                <p className="text-xs text-[#737D87] mb-4">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name *"
                      className="w-full h-10 pl-9 pr-3 text-xs sm:text-[13px] bg-white border border-[#E5E9ED] rounded-lg text-[#17212B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#E91E32] focus:ring-1 focus:ring-[#E91E32] transition-colors"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address *"
                      className="w-full h-10 pl-9 pr-3 text-xs sm:text-[13px] bg-white border border-[#E5E9ED] rounded-lg text-[#17212B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#E91E32] focus:ring-1 focus:ring-[#E91E32] transition-colors"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number *"
                      className="w-full h-10 pl-9 pr-3 text-xs sm:text-[13px] bg-white border border-[#E5E9ED] rounded-lg text-[#17212B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#E91E32] focus:ring-1 focus:ring-[#E91E32] transition-colors"
                      required
                    />
                  </div>

                  {/* Select Subject Dropdown */}
                  <div className="relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 text-xs sm:text-[13px] bg-white border border-[#E5E9ED] rounded-lg text-[#17212B] focus:outline-none focus:border-[#E91E32] focus:ring-1 focus:ring-[#E91E32] transition-colors appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select Subject *</option>
                      <option value="Product Enquiry">Product Enquiry</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Warranty & Service">Warranty & Service</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737D87] pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-[#94A3B8]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Your Message *"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-[13px] bg-white border border-[#E5E9ED] rounded-lg text-[#17212B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#E91E32] focus:ring-1 focus:ring-[#E91E32] transition-colors resize-y min-h-[80px]"
                      required
                    />
                  </div>

                  {/* Submission Status Alerts */}
                  {formStatus.state === 'success' && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-emerald-700 text-xs">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formStatus.message}</span>
                    </div>
                  )}

                  {formStatus.state === 'error' && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-700 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formStatus.message}</span>
                    </div>
                  )}

                  {/* Red Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-10 bg-[#E91E32] hover:bg-[#D01426] text-white font-semibold text-xs sm:text-[13px] rounded-lg flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

              {/* Card 2: Contact Details */}
              <div className="bg-white border border-[#E5E9ED] rounded-xl p-5 sm:p-6 shadow-xs">
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#E91E32] uppercase mb-3 block">
                  CONTACT DETAILS
                </span>

                <div className="space-y-3 divide-y divide-[#F1F5F9]">
                  {/* Call Us */}
                  <div className="flex items-start gap-3 pt-2.5 first:pt-0">
                    <div className="w-8 h-8 rounded-full bg-[#E91E32] flex items-center justify-center text-white shrink-0 shadow-2xs">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#737D87] font-medium">Call Us</div>
                      <a
                        href="tel:+97714284654"
                        className="text-xs sm:text-sm font-bold text-[#111D27] hover:text-[#E91E32] transition-colors block"
                      >
                        +977 1-4284654
                      </a>
                      <div className="text-[10px] text-[#94A3B8]">Sun - Fri, 9:00 AM - 6:00 PM</div>
                    </div>
                  </div>

                  {/* Service Care Number */}
                  <div className="flex items-start gap-3 pt-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#E91E32] shrink-0 shadow-2xs">
                      <Headphones className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#737D87] font-medium">Service Care Number</div>
                      <a
                        href="tel:+9779700727072"
                        className="text-xs sm:text-sm font-bold text-[#111D27] hover:text-[#E91E32] transition-colors block"
                      >
                        +977 9700727072
                      </a>
                      <div className="text-[10px] text-[#94A3B8]">Sun - Fri, 9:00 AM - 6:00 PM</div>
                    </div>
                  </div>

                  {/* Visit Us */}
                  <div className="flex items-start gap-3 pt-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E91E32] flex items-center justify-center text-white shrink-0 shadow-2xs">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#737D87] font-medium">Visit Us</div>
                      <div className="text-xs sm:text-sm font-semibold text-[#111D27]">
                        Gaurishankar Marg, Kuleshwor, Kathmandu, Nepal
                      </div>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3 pt-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E91E32] flex items-center justify-center text-white shrink-0 shadow-2xs">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#737D87] font-medium">Website</div>
                      <a
                        href="https://awainepal.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs sm:text-sm font-bold text-[#111D27] hover:text-[#E91E32] transition-colors block"
                      >
                        https://awainepal.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Social Media with circular brand colored icons */}
              <div className="bg-white border border-[#E5E9ED] rounded-xl p-4 sm:p-5 shadow-xs">
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#E91E32] uppercase mb-2.5 block">
                  FOLLOW US ON SOCIAL MEDIA
                </span>

                <div className="flex items-center gap-2.5">
                  {/* Facebook (Blue) */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8.5 h-8.5 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </a>

                  {/* Instagram (Gradient) */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>

                  {/* YouTube (Red) */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8.5 h-8.5 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5" />
                  </a>

                  {/* TikTok (Black) */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8.5 h-8.5 rounded-full bg-[#000000] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-3.5 h-3.5" />
                  </a>

                  {/* LinkedIn (Blue) */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8.5 h-8.5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Supplier Information Banner */}
      <section className="w-full bg-[#F6F8FB] border-t border-[#E5E9ED] py-4 sm:py-5">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Storefront icon & text */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#E91E32] shrink-0 shadow-2xs">
              <Store className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#111D27] leading-snug">
                Importer and supplier of AWAI and Techstar for Nepal
              </h3>
              <p className="text-[11px] sm:text-xs text-[#737D87] mt-0.5 leading-normal">
                Air conditioner, Washing Machine, Refrigerator, Visi Cooler, Chest Freezer, RO Purifier, Air Cooler, Fans and Home appliances.
              </p>
            </div>
          </div>

          {/* Right: Line art appliances illustration */}
          <div className="shrink-0 max-w-[240px] sm:max-w-[280px] opacity-80 select-none">
            <img
              src="/images/supplier-appliances.png"
              alt="AWAI Household Appliances Line Art"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
