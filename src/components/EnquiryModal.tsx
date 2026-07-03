import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Phone, MapPin, Mail, User, BookOpen } from 'lucide-react';
import { ContactMessage } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export default function EnquiryModal({ isOpen, onClose, initialSubject = 'General Project Inquiry' }: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    // Simple validation
    if (!name || !email || !subject || !message) {
      setErrorMsg('All input fields are required. Please fill in all fields before submitting.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database post delay
    setTimeout(() => {
      const newInquiry: ContactMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        phone,
        location,
        subject,
        message,
        timestamp: new Date().toLocaleString(),
        status: 'unread'
      };

      try {
        const stored = localStorage.getItem('suhas_portfolio_inquiries');
        const existing: ContactMessage[] = stored ? JSON.parse(stored) : [];
        const updatedMessages = [newInquiry, ...existing];
        localStorage.setItem('suhas_portfolio_inquiries', JSON.stringify(updatedMessages));
        
        // Dispatch a custom event to notify other components (e.g., ContactForm) to update their messages
        window.dispatchEvent(new Event('suhas_inquiries_updated'));
      } catch (e) {
        console.error("Local storage update failed", e);
      }

      setIsSubmitting(false);
      setSuccess(true);
      
      // Clear inputs except subject
      setName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setMessage('');

      // Auto-close modal after a delay
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div 
      id="enquiry-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="enquiry-modal-container"
        className="relative w-full max-w-xl bg-brand-surface border border-brand-outline-variant/30 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary" />

        {/* Close Button */}
        <button 
          id="close-enquiry-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-brand-on-surface-variant hover:text-white hover:bg-brand-primary/20 transition-all border border-white/5 hover:scale-110 active:scale-95"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0">
            <MessageSquare size={20} />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-brand-on-surface tracking-tight">
              Start an <span className="gradient-text">Enquiry</span>
            </h3>
            <p className="text-xs text-brand-on-surface-variant/80 font-sans mt-0.5">
              Submit details about your project or general consulting questions.
            </p>
          </div>
        </div>

        {/* Modal Form / Success State */}
        <div className="p-6">
          {success ? (
            <div id="enquiry-success-view" className="py-8 text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/30 animate-pulse">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-display font-bold text-brand-on-surface">Enquiry Submitted!</h4>
                <p className="text-sm text-brand-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your enquiry has been received and logged. Suhas will get back to you shortly.
                </p>
              </div>
            </div>
          ) : (
            <form id="enquiry-form" onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Email Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="modal-name" className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80 flex items-center gap-1">
                    <User size={10} className="text-brand-primary" /> Full Name
                  </label>
                  <input 
                    id="modal-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-bg/85 border border-brand-outline-variant/30 dark:border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-2.5 text-sm transition-all"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-email" className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80 flex items-center gap-1">
                    <Mail size={10} className="text-brand-primary" /> Email Address
                  </label>
                  <input 
                    id="modal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-bg/85 border border-brand-outline-variant/30 dark:border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-2.5 text-sm transition-all"
                    placeholder="e.g. john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone & Location Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="modal-phone" className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80 flex items-center gap-1">
                    <Phone size={10} className="text-brand-secondary" /> Phone Number
                  </label>
                  <input 
                    id="modal-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-brand-bg/85 border border-brand-outline-variant/30 dark:border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-2.5 text-sm transition-all"
                    placeholder="e.g. +91 99999 99999"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-location" className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80 flex items-center gap-1">
                    <MapPin size={10} className="text-brand-tertiary" /> Location / City
                  </label>
                  <input 
                    id="modal-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-brand-bg/85 border border-brand-outline-variant/30 dark:border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-2.5 text-sm transition-all"
                    placeholder="e.g. Pune, India"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="modal-subject" className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80 flex items-center gap-1">
                  <BookOpen size={10} className="text-brand-primary" /> Subject / Topic
                </label>
                <input 
                  id="modal-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-brand-bg/85 border border-brand-outline-variant/30 dark:border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-2.5 text-sm transition-all"
                  placeholder="e.g. Cloud Transformation Consulting"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="modal-message" className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80">Message / Inquiry Details</label>
                <textarea 
                  id="modal-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-brand-bg/85 border border-brand-outline-variant/30 dark:border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-3 text-sm transition-all resize-none"
                  placeholder="Please describe your requirements, timeline, or inquiries..."
                  required
                />
              </div>

              {/* Error Box */}
              {errorMsg && (
                <div id="enquiry-modal-error" className="text-brand-error text-xs bg-brand-error/10 border border-brand-error/20 p-3 rounded-lg flex items-center gap-2">
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button 
                id="submit-enquiry-modal-btn"
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm tracking-wide text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Registering Inquiry...
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
