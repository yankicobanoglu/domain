import React from 'react';
import { X, ShieldCheck, Scale } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
  onAccept: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose, onAccept }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-indigo-400">
            <Scale size={20} />
            <h2 className="font-bold text-white tracking-wide">Privacy & Terms</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 text-slate-300 leading-relaxed space-y-6 max-h-[70vh] overflow-y-auto">
          <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">
            Last Updated: {new Date().getFullYear()}
          </p>

          <section>
            <h3 className="text-white font-semibold text-lg mb-2">1. Introduction</h3>
            <p>
              Welcome to <strong>The Playground</strong>. By accessing this website and playing our games, you agree to the following
              Privacy Policy and Terms of Service.
            </p>
          </section>

          <div className="w-full h-px bg-slate-800 my-4" />
          
          <h4 className="text-indigo-400 font-bold uppercase text-xs tracking-wider mb-4">Part I: Privacy Policy</h4>

          <section>
            <h3 className="text-white font-semibold text-lg mb-2">2. Data Collection</h3>
            <p>
              We use <strong>Vercel Web Analytics</strong> to collect anonymous usage data (browser type, region).
              We do <strong>not</strong> collect personally identifiable information (PII), IP addresses, or use tracking cookies.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-2">3. Local Storage</h3>
            <p>
              Our games (Dual N-Back, Imposter) store data (high scores, game state) locally on your device using 
              <strong> Local Storage</strong>. This data is never transmitted to our servers.
            </p>
          </section>

          <div className="w-full h-px bg-slate-800 my-4" />

          <h4 className="text-indigo-400 font-bold uppercase text-xs tracking-wider mb-4">Part II: Terms of Service</h4>

          <section>
            <h3 className="text-white font-semibold text-lg mb-2">4. Medical Disclaimer</h3>
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <p className="text-indigo-200 font-medium">
                The games provided (specifically Dual N-Back) are for entertainment and educational purposes only.
              </p>
              <p className="mt-2 text-sm">
                While based on cognitive science concepts, this software is <strong>not a medical device</strong> and is not intended to diagnose, treat, cure, or prevent any disease or condition (such as ADHD). 
                Please consult a healthcare professional for medical advice.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-2">5. Disclaimer of Warranties</h3>
            <p>
              The software is provided "AS IS", without warranty of any kind. The creator is not liable for any damages 
              arising from the use of this software.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-2">6. Intellectual Property</h3>
            <p>
              The code, design, and original content are the property of Yanki Cobanoglu. You may play these games freely 
              for personal, non-commercial use.
            </p>
          </section>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 text-center">
          <button 
            onClick={onAccept}
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};