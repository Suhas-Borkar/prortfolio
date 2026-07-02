import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertTriangle, Inbox, Trash2, CheckSquare } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Inbox states
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('suhas_portfolio_inquiries');
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        // Seed default message for demo purpose
        const defaultInquiry: ContactMessage = {
          id: 'demo-1',
          name: 'Sarah Jenkins',
          email: 'sjenkins@techinnovators.com',
          subject: 'Architect position for Cloud Platform',
          message: 'Hi Suhas, we saw your portfolio and your work on the BI Dashboard. We would love to set up a chat regarding a Senior Full Stack opportunity with our remote-first architecture team. Let us know when you are available!',
          timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString(),
          status: 'unread'
        };
        localStorage.setItem('suhas_portfolio_inquiries', JSON.stringify([defaultInquiry]));
        setMessages([defaultInquiry]);
      }
    } catch (e) {
      console.error("Local storage access failed", e);
    }
  }, []);

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
      setErrorMsg('Please enter a valid email address (e.g., example@domain.com).');
      return;
    }

    setIsSubmitting(true);

    // Simulate database post delay
    setTimeout(() => {
      const newInquiry: ContactMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        subject,
        message,
        timestamp: new Date().toLocaleString(),
        status: 'unread'
      };

      const updatedMessages = [newInquiry, ...messages];
      setMessages(updatedMessages);
      try {
        localStorage.setItem('suhas_portfolio_inquiries', JSON.stringify(updatedMessages));
      } catch (e) {
        console.error(e);
      }

      setIsSubmitting(false);
      setSuccess(true);
      
      // Clear inputs
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  const deleteMessage = (id: string) => {
    const filtered = messages.filter(m => m.id !== id);
    setMessages(filtered);
    localStorage.setItem('suhas_portfolio_inquiries', JSON.stringify(filtered));
  };

  const toggleStatus = (id: string) => {
    const updated = messages.map(m => {
      if (m.id === id) {
        return { ...m, status: (m.status === 'unread' ? 'read' : 'unread') as 'unread' | 'read' };
      }
      return m;
    });
    setMessages(updated);
    localStorage.setItem('suhas_portfolio_inquiries', JSON.stringify(updated));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Left Column: Contact details */}
      <div className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
          Let's build something <span className="gradient-text">exceptional</span> together.
        </h2>
        <p className="text-base sm:text-lg text-brand-on-surface-variant max-w-lg leading-relaxed">
          Currently open to new opportunities, senior roles, and interesting high-performance freelance projects. If you have a challenge, I have the solution.
        </p>

        <div className="space-y-6 pt-4">
          {/* Email Card */}
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:text-brand-tertiary transition-all duration-300">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-xs font-display font-bold text-brand-on-surface-variant/70 uppercase tracking-widest">Email Me</div>
              <a href="mailto:suhasborkar80@gmail.com" className="font-bold text-white hover:text-brand-primary transition-colors">
                suhasborkar80@gmail.com
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-brand-secondary group-hover:scale-110 group-hover:text-brand-primary transition-all duration-300">
              <Phone size={20} />
            </div>
            <div>
              <div className="text-xs font-display font-bold text-brand-on-surface-variant/70 uppercase tracking-widest">Call Me</div>
              <a href="tel:+918698095892" className="font-bold text-white hover:text-brand-primary transition-colors">
                +91 8698095892
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-brand-tertiary group-hover:scale-110 group-hover:text-brand-primary transition-all duration-300">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-xs font-display font-bold text-brand-on-surface-variant/70 uppercase tracking-widest">Location</div>
              <div className="font-bold text-white">
                India (GMT +5:30)
              </div>
            </div>
          </div>
        </div>

        {/* Secret inbox access badge for dynamic testing */}
        <div className="pt-6 border-t border-white/5">
          <button 
            id="toggle-inbox-btn"
            onClick={() => setShowInbox(!showInbox)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-surface-container/60 hover:bg-brand-surface-container text-brand-secondary text-xs rounded-lg border border-white/5 transition-all"
          >
            <Inbox size={14} className={messages.some(m => m.status === 'unread') ? "text-brand-tertiary animate-pulse" : ""} />
            {showInbox ? "Hide Local Submissions" : "Review Submitted Messages"} ({messages.length})
          </button>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="space-y-6">
        {showInbox ? (
          /* Submissions Manager (Inbox Panel) */
          <div id="submissions-inbox" className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-white flex items-center gap-2">
                <Inbox size={18} className="text-brand-primary" /> Submitted Inquiries (Local)
              </h3>
              <button 
                id="hide-inbox-btn"
                onClick={() => setShowInbox(false)} 
                className="text-xs text-brand-primary hover:underline"
              >
                Return to Form
              </button>
            </div>

            {messages.length === 0 ? (
              <p className="text-sm text-brand-on-surface-variant/60 py-8 text-center italic">
                No local submissions found. Use the form to send a mock message!
              </p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`p-4 rounded-xl border transition-all text-xs sm:text-sm ${msg.status === 'unread' ? 'bg-brand-primary/5 border-brand-primary/30' : 'bg-brand-surface border-white/5 opacity-80'}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="font-bold text-white">{msg.name}</span>
                        <span className="text-brand-on-surface-variant/70 block">{msg.email}</span>
                      </div>
                      <span className="text-[10px] text-brand-on-surface-variant/50 font-mono">{msg.timestamp}</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-brand-tertiary">Subj: </span>
                      <span className="text-white">{msg.subject}</span>
                    </div>
                    <p className="text-brand-on-surface-variant leading-relaxed mb-3 bg-black/20 p-2.5 rounded border border-white/5 font-mono text-xs">
                      {msg.message}
                    </p>
                    <div className="flex justify-between items-center">
                      <button 
                        id={`toggle-status-${msg.id}`}
                        onClick={() => toggleStatus(msg.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-brand-primary hover:underline"
                      >
                        <CheckSquare size={12} />
                        {msg.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                      </button>
                      <button 
                        id={`delete-message-${msg.id}`}
                        onClick={() => deleteMessage(msg.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-brand-error hover:underline"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Actual Contact Form */
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            {/* Visual background glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Alert Message */}
              {errorMsg && (
                <div id="contact-error" className="p-3.5 bg-brand-error-container/20 border border-brand-error/30 text-brand-error rounded-xl flex items-start gap-2.5 text-sm">
                  <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {success && (
                <div id="contact-success" className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-start gap-2.5 text-sm animate-fade-in">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Inquiry Submitted Successfully!</span>
                    <span>Your message has been captured. You can check it via the 'Review Submitted Messages' dashboard.</span>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="text-xs font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80">Full Name</label>
                  <input 
                    id="form-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-bg/80 border border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-3 text-sm transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="text-xs font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80">Email Address</label>
                  <input 
                    id="form-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-bg/80 border border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-3 text-sm transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-subject" className="text-xs font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80">Subject</label>
                <input 
                  id="form-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-brand-bg/80 border border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-3 text-sm transition-all"
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-message" className="text-xs font-display font-bold uppercase tracking-widest text-brand-on-surface-variant/80">Message</label>
                <textarea 
                  id="form-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-brand-bg/80 border border-white/10 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-on-surface px-4 py-3 text-sm transition-all"
                  placeholder="Tell me about your project, technology challenges, or goals..."
                  rows={4}
                  required
                />
              </div>

              <button 
                id="submit-message-btn"
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Transmission...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
