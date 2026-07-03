import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Code, Check, Play, RefreshCw, ChevronRight } from 'lucide-react';
import { HERO_DATA, SKILLS_DATA, PROJECTS_DATA } from '../data';

export default function TerminalSimulator() {
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal'>('editor');
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  // Terminal history
  const [history, setHistory] = useState<string[]>([
    "Suhas Borkar OS [Version 4.2.1]",
    "(c) 2026 Suhas Borkar. All rights reserved.",
    "",
    "Type 'help' to see available commands or 'run' to execute standard sequence."
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const copyCode = () => {
    const code = `const Developer = {
  name: "Suhas Borkar",
  role: "Full Stack",
  skills: ["Angular", "Next.js", "PHP", "Docker", "AWS"],
  passion: "Clean Code & Digital Craftsmanship",
  coffee: Infinity,
  availableForHire: true
};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let response: string[] = [];

    switch (cmd) {
      case 'help':
        response = [
          `> ${inputVal}`,
          "Available commands:",
          "  about    - Brief background on Suhas",
          "  skills   - List technical competencies",
          "  projects - View key portfolio creations",
          "  clear    - Clear terminal output",
          "  run      - Trigger simulation cycle",
          "  coffee   - Buy Suhas a virtual cup of coffee",
          "  exit     - Switch back to editor view"
        ];
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'about':
        response = [
          `> ${inputVal}`,
          `Name: ${HERO_DATA.name}`,
          `Role: ${HERO_DATA.title}`,
          `Bio: ${HERO_DATA.description}`,
          "Experience: 2.7+ Years of engineering responsive products."
        ];
        break;
      case 'skills':
        const skillsList = SKILLS_DATA.map(s => `• ${s.name} (${s.category})`);
        response = [
          `> ${inputVal}`,
          "Technical Arsenal:",
          ...skillsList
        ];
        break;
      case 'projects':
        const projectList = PROJECTS_DATA.map(p => `• ${p.title} - ${p.description}`);
        response = [
          `> ${inputVal}`,
          "Featured Creations:",
          ...projectList
        ];
        break;
      case 'coffee':
        response = [
          `> ${inputVal}`,
          "☕ Ingesting double espresso shot...",
          "⚡ Productivity increased by 300%!",
          "Suhas says: 'Thanks, partner! Code compilation speed optimized.'"
        ];
        break;
      case 'exit':
        setActiveTab('editor');
        setInputVal('');
        return;
      case 'run':
        triggerSimulation();
        setInputVal('');
        return;
      default:
        response = [
          `> ${inputVal}`,
          `Command '${inputVal}' not recognized. Type 'help' for a list of available requests.`
        ];
    }

    setHistory(prev => [...prev, ...response, ""]);
    setInputVal('');
  };

  const triggerSimulation = () => {
    setIsRunning(true);
    setActiveTab('terminal');
    setHistory(prev => [...prev, "> Initializing build process...", "⌛ Resolving dependencies...", "✓ Webpack & Vite bundle prepared."]);

    setTimeout(() => {
      setHistory(prev => [...prev, "✓ Server launched successfully on http://localhost:3000", "🔥 HMR enabled. Monitoring file states.", ""]);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div id="terminal-simulator" className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
      {/* Tab Header bar */}
      <div className="bg-[#0b0e15]/90 px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Mock Buttons */}
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-error inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-brand-tertiary inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-brand-primary inline-block"></span>
          </div>
          <span className="text-xs font-mono text-brand-on-surface-variant/80 select-none ml-2 hidden sm:inline-block">suhas-borkar-portfolio</span>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#191b23] p-1 rounded-lg border border-white/5">
          <button 
            id="tab-editor"
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 rounded text-xs font-medium font-mono flex items-center gap-1.5 transition-all ${activeTab === 'editor' ? 'bg-brand-primary/20 text-brand-primary' : 'text-brand-on-surface-variant hover:text-brand-on-surface'}`}
          >
            <Code size={12} />
            developer.json
          </button>
          <button 
            id="tab-terminal"
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded text-xs font-medium font-mono flex items-center gap-1.5 transition-all ${activeTab === 'terminal' ? 'bg-brand-primary/20 text-brand-primary' : 'text-brand-on-surface-variant hover:text-brand-on-surface'}`}
          >
            <Terminal size={12} />
            bash
          </button>
        </div>
      </div>

      {/* Editor Content Mode */}
      {activeTab === 'editor' && (
        <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[280px] text-brand-on-surface select-text bg-[#10131a]/40">
          <div className="flex justify-between items-start mb-2 border-b border-white/5 pb-2">
            <span className="text-xs text-brand-on-surface-variant font-sans">JSON Representation</span>
            <button 
              id="copy-code-btn"
              onClick={copyCode}
              className="text-brand-primary hover:text-brand-on-surface transition-colors flex items-center gap-1 text-xs font-sans px-2 py-1 rounded hover:bg-brand-primary/10"
              title="Copy details block"
            >
              {copied ? <Check size={12} className="text-green-400" /> : <Code size={12} />}
              {copied ? 'Copied' : 'Copy Block'}
            </button>
          </div>
          <pre className="text-brand-primary leading-relaxed whitespace-pre-wrap break-all sm:whitespace-pre">
            <span className="text-brand-tertiary">const</span> <span className="text-brand-primary">Developer</span> = {'{'}
            {"\n  "}name: <span className="text-brand-tertiary">"Suhas Borkar"</span>,
            {"\n  "}role: <span className="text-brand-tertiary">"Full Stack Developer"</span>,
            {"\n  "}skills: [<span className="text-brand-tertiary">"Angular"</span>, <span className="text-brand-tertiary">"Next.js"</span>, <span className="text-brand-tertiary">"PHP"</span>, <span className="text-brand-tertiary">"Docker"</span>, <span className="text-brand-tertiary">"AWS"</span>],
            {"\n  "}passion: <span className="text-brand-tertiary">"Clean Code &amp; Visual UX"</span>,
            {"\n  "}coffee: <span className="text-brand-tertiary">Infinity</span>,
            {"\n  "}availability: <span className="text-brand-tertiary">"Open for exciting projects"</span>
            {"\n"}{'};'}
          </pre>

          {/* Prompt action to run */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-brand-on-surface-variant font-sans">
              Want to see this profile build and run?
            </p>
            <button 
              id="run-simulation-btn"
              disabled={isRunning}
              onClick={triggerSimulation}
              className="btn-primary px-4 py-1.5 rounded-lg text-white font-semibold text-xs flex items-center gap-1 hover:scale-95 transition-transform"
            >
              {isRunning ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} />}
              {isRunning ? 'Building...' : 'Run Console'}
            </button>
          </div>
        </div>
      )}

      {/* Terminal Content Mode */}
      {activeTab === 'terminal' && (
        <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed bg-brand-surface-container-lowest/80 h-[280px] overflow-y-auto flex flex-col justify-between">
          <div className="space-y-1.5 overflow-y-auto pr-1">
            {history.map((line, idx) => (
              <div 
                key={idx} 
                className={`whitespace-pre-wrap ${
                  line.startsWith('>') 
                    ? 'text-brand-primary font-semibold' 
                    : line.includes('✓') || line.includes('Success') 
                      ? 'text-green-400' 
                      : line.startsWith('•') 
                        ? 'text-brand-secondary/90 pl-2'
                        : 'text-brand-on-surface-variant'
                }`}
              >
                {line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form onSubmit={handleCommandSubmit} className="mt-4 border-t border-white/10 pt-3 flex items-center">
            <span className="text-brand-primary mr-2 font-bold flex items-center"><ChevronRight size={14} /> suhas@portfolio:~$&nbsp;</span>
            <input 
              id="terminal-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help'..."
              className="flex-1 bg-transparent border-0 outline-0 p-0 text-brand-on-surface font-mono placeholder-brand-on-surface-variant/40 focus:ring-0 focus:border-0"
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
}
