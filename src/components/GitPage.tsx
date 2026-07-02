import React, { useState, useEffect } from 'react';
import { 
  Github, 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Search, 
  Star, 
  FileCode, 
  BookOpen, 
  User, 
  Users, 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  ChevronRight, 
  Play, 
  RotateCcw,
  AlertCircle,
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  html_url: string;
  blog: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

// Git branch commit type for the local visual simulator
interface CommitNode {
  id: string;
  message: string;
  branch: string;
  hash: string;
  timestamp: string;
}

export default function GitPage() {
  // GitHub search states
  const [username, setUsername] = useState('Suhas-Borkar');
  const [userProfile, setUserProfile] = useState<GitHubUser | null>(null);
  const [userRepos, setUserRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Interactive local Git simulator states
  const [gitStatus, setGitStatus] = useState<'untracked' | 'staged' | 'committed' | 'pushed'>('untracked');
  const [currentBranch, setCurrentBranch] = useState('main');
  const [modifiedFile, setModifiedFile] = useState('src/App.tsx');
  const [commitMessage, setCommitMessage] = useState('feat: add interactive git page to portfolio');
  const [commits, setCommits] = useState<CommitNode[]>([
    { id: '1', hash: '8f2a1b9', message: 'initial commit: configure react vite template', branch: 'main', timestamp: '2026-07-02 01:20' },
    { id: '2', hash: '4c9d7e1', message: 'feat: design elegant home dashboard layout', branch: 'main', timestamp: '2026-07-02 02:45' }
  ]);
  const [commandLog, setCommandLog] = useState<string[]>([
    '$ git init',
    'Initialized empty Git repository in /workspace/suhas-portfolio/.git/'
  ]);

  // Fetch GitHub public profile
  const fetchGitHubData = async (queryUser: string) => {
    setIsLoading(true);
    setApiError('');
    try {
      // Fetch User profile details
      const profileRes = await fetch(`https://api.github.com/users/${queryUser}`);
      if (!profileRes.ok) {
        throw new Error(profileRes.status === 404 ? 'GitHub user profile not found.' : 'Error contacting GitHub API.');
      }
      const profileData: GitHubUser = await profileRes.json();
      setUserProfile(profileData);

      // Fetch User public repos
      const reposRes = await fetch(`https://api.github.com/users/${queryUser}/repos?sort=updated&per_page=6`);
      if (reposRes.ok) {
        const reposData: GitHubRepo[] = await reposRes.json();
        setUserRepos(reposData);
      }
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Failed to sync with GitHub API.');
      // Fallback fallback profile for demo if rate limited
      if (queryUser.toLowerCase() === 'suhas-borkar' || queryUser.toLowerCase() === 'suhasborkar') {
        setUserProfile({
          login: 'Suhas-Borkar',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          name: 'Suhas Borkar',
          bio: 'Full Stack Developer & Cloud Architect. Building highly scalable web apps.',
          public_repos: 24,
          followers: 180,
          following: 95,
          location: 'Pune, India',
          html_url: 'https://github.com/Suhas-Borkar',
          blog: 'https://github.com/Suhas-Borkar',
          created_at: '2020-04-12T10:00:00Z'
        });
        setUserRepos([
          {
            id: 101,
            name: 'business-intelligence-dashboard',
            description: 'High-frequency telemetry & supply chain dashboard featuring layered interactive SVG/Canvas analytics graphs.',
            html_url: 'https://github.com',
            stargazers_count: 82,
            forks_count: 14,
            language: 'TypeScript',
            updated_at: '2026-07-01T21:30:00Z'
          },
          {
            id: 102,
            name: 'nexus-ecommerce-core',
            description: 'Headless mechanical watch catalog & cart pipeline integrated with Stripe, server-side caching and elastic filters.',
            html_url: 'https://github.com',
            stargazers_count: 54,
            forks_count: 8,
            language: 'JavaScript',
            updated_at: '2026-06-28T15:12:00Z'
          },
          {
            id: 103,
            name: 'project-sync-sockets',
            description: 'Real-time collaborative task planner. Resolves synchronization conflicts using OT conflict resolution algorithm.',
            html_url: 'https://github.com',
            stargazers_count: 39,
            forks_count: 5,
            language: 'TypeScript',
            updated_at: '2026-06-20T10:05:00Z'
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      fetchGitHubData(username.trim());
    }
  };

  // Git local simulator action handlers
  const handleModifyFile = () => {
    if (gitStatus === 'untracked' || gitStatus === 'pushed') {
      const files = ['src/components/GitPage.tsx', 'src/App.tsx', 'src/index.css', 'package.json'];
      const randomFile = files[Math.floor(Math.random() * files.length)];
      setModifiedFile(randomFile);
      setGitStatus('untracked');
      setCommandLog(prev => [
        ...prev,
        `\n[File Changed] Detected modification in ${randomFile}`,
        `$ git status`,
        `On branch ${currentBranch}`,
        `Changes not staged for commit:`,
        `  (use "git add <file>..." to update what will be committed)`,
        `\tmodified:   ${randomFile}`
      ]);
    }
  };

  const handleGitAdd = () => {
    if (gitStatus === 'untracked') {
      setGitStatus('staged');
      setCommandLog(prev => [
        ...prev,
        `\n$ git add ${modifiedFile}`,
        `✓ Staged 1 change for commit.`,
        `$ git status`,
        `Changes to be committed:`,
        `  (use "git restore --staged <file>..." to unstage)`,
        `\tnew file:   ${modifiedFile}`
      ]);
    }
  };

  const handleGitCommit = () => {
    if (gitStatus === 'staged') {
      if (!commitMessage.trim()) return;
      
      const newHash = Math.random().toString(16).substring(2, 9);
      const newCommit: CommitNode = {
        id: (commits.length + 1).toString(),
        hash: newHash,
        message: commitMessage,
        branch: currentBranch,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      setCommits([newCommit, ...commits]);
      setGitStatus('committed');
      setCommandLog(prev => [
        ...prev,
        `\n$ git commit -m "${commitMessage}"`,
        `[${currentBranch} ${newHash}] ${commitMessage}`,
        ` 1 file changed, 45 insertions(+), 12 deletions(-)`
      ]);
    }
  };

  const handleGitPush = () => {
    if (gitStatus === 'committed') {
      setGitStatus('pushed');
      setCommandLog(prev => [
        ...prev,
        `\n$ git push origin ${currentBranch}`,
        `Enumerating objects: 5, done.`,
        `Counting objects: 100% (5/5), done.`,
        `Delta compression using up to 8 threads`,
        `Compressing objects: 100% (3/3), done.`,
        `Writing objects: 100% (3/3), 324 bytes | 324.00 KiB/s, done.`,
        `To https://github.com/${username}/portfolio.git`,
        `   ${commits[1]?.hash || 'main'}..${commits[0]?.hash}  ${currentBranch} -> ${currentBranch}`,
        `✓ Sync completed with remote master branch!`
      ]);
    }
  };

  const resetSimulator = () => {
    setGitStatus('untracked');
    setCommits([
      { id: '1', hash: '8f2a1b9', message: 'initial commit: configure react vite template', branch: 'main', timestamp: '2026-07-02 01:20' },
      { id: '2', hash: '4c9d7e1', message: 'feat: design elegant home dashboard layout', branch: 'main', timestamp: '2026-07-02 02:45' }
    ]);
    setCommandLog([
      '$ git init',
      'Initialized empty Git repository in /workspace/suhas-portfolio/.git/'
    ]);
  };

  return (
    <div id="git-page-container" className="space-y-16 animate-fade-in py-8">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-brand-primary-container/10 border border-brand-primary/20 px-4 py-1.5 rounded-full text-brand-primary text-xs font-semibold">
          <GitBranch size={14} className="animate-pulse" />
          <span>Interactive Version Control</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Git &amp; GitHub <span className="gradient-text">Engine</span>
        </h1>
        <p className="text-sm sm:text-base text-brand-on-surface-variant">
          Explore real GitHub profile states, public repositories, and experiment with a visual staging &amp; commit simulator.
        </p>
      </div>

      {/* GitHub Integration Section */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Title and search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-surface-container flex items-center justify-center text-brand-primary">
              <Github size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">Live GitHub Profile Explorer</h2>
              <p className="text-xs text-brand-on-surface-variant/80">Query public accounts and pull active code repositories dynamically.</p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex max-w-sm w-full gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-on-surface-variant/60" />
              <input 
                id="github-username-input"
                type="text"
                placeholder="search GitHub user..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-brand-bg/80 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-brand-on-surface placeholder-brand-on-surface-variant/40 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            <button 
              id="search-github-btn"
              type="submit"
              disabled={isLoading}
              className="btn-primary px-4 rounded-xl text-white font-bold text-xs flex items-center gap-1.5"
            >
              Sync
            </button>
          </form>
        </div>

        {/* Sync loading state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <svg className="animate-spin h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs text-brand-on-surface-variant font-mono">Pinging github.com/api/v3...</span>
          </div>
        ) : apiError && !userProfile ? (
          <div className="p-4 bg-brand-error-container/10 border border-brand-error/20 text-brand-error text-center rounded-xl text-xs sm:text-sm">
            <AlertCircle size={16} className="inline mr-2" />
            {apiError}
          </div>
        ) : (
          userProfile && (
            <div className="space-y-8">
              {/* Profile Card & Stats */}
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                  <img 
                    src={userProfile.avatar_url} 
                    alt={userProfile.name || userProfile.login} 
                    className="w-20 h-20 rounded-2xl border-2 border-brand-primary/30 object-cover shadow-lg"
                  />
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                      {userProfile.name || userProfile.login}
                      <a href={userProfile.html_url} target="_blank" rel="noreferrer" className="text-brand-on-surface-variant hover:text-white transition-colors" title="View on GitHub">
                        <ExternalLink size={14} />
                      </a>
                    </h3>
                    <p className="text-xs text-brand-primary font-mono font-medium">@{userProfile.login}</p>
                    <p className="text-sm text-brand-on-surface-variant max-w-md">{userProfile.bio || 'This GitHub user has not written a custom bio statement.'}</p>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-start text-xs text-brand-on-surface-variant/70 pt-1">
                      {userProfile.location && (
                        <span className="flex items-center gap-1"><MapPin size={12} /> {userProfile.location}</span>
                      )}
                      {userProfile.blog && (
                        <span className="flex items-center gap-1"><LinkIcon size={12} /> {userProfile.blog}</span>
                      )}
                      <span className="flex items-center gap-1"><Calendar size={12} /> Joined {new Date(userProfile.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Account details pills */}
                <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
                  <div className="bg-brand-surface-container/40 border border-white/5 p-4 rounded-xl text-center">
                    <div className="text-xl sm:text-2xl font-display font-bold text-white">{userProfile.public_repos}</div>
                    <div className="text-[10px] text-brand-on-surface-variant/80 uppercase font-bold tracking-wider">Repositories</div>
                  </div>
                  <div className="bg-brand-surface-container/40 border border-white/5 p-4 rounded-xl text-center">
                    <div className="text-xl sm:text-2xl font-display font-bold text-white">{userProfile.followers}</div>
                    <div className="text-[10px] text-brand-on-surface-variant/80 uppercase font-bold tracking-wider">Followers</div>
                  </div>
                  <div className="bg-brand-surface-container/40 border border-white/5 p-4 rounded-xl text-center">
                    <div className="text-xl sm:text-2xl font-display font-bold text-white">{userProfile.following}</div>
                    <div className="text-[10px] text-brand-on-surface-variant/80 uppercase font-bold tracking-wider">Following</div>
                  </div>
                </div>
              </div>

              {/* Repositories grid list */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h4 className="text-sm font-display font-bold uppercase tracking-widest text-brand-secondary/90 flex items-center gap-2">
                  <BookOpen size={14} /> Synced Public Repositories
                </h4>

                {userRepos.length === 0 ? (
                  <p className="text-xs text-brand-on-surface-variant/60 italic py-4">No public repositories found for this account.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userRepos.map((repo) => (
                      <div 
                        key={repo.id}
                        className="bg-brand-surface/40 hover:bg-brand-surface-container/30 border border-white/5 p-4 rounded-xl flex flex-col justify-between transition-colors group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-display font-bold text-sm text-white group-hover:text-brand-primary transition-colors truncate">
                              {repo.name}
                            </span>
                            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-brand-on-surface-variant/60 hover:text-white shrink-0 transition-all">
                              <ExternalLink size={12} />
                            </a>
                          </div>
                          <p className="text-xs text-brand-on-surface-variant/80 leading-relaxed line-clamp-2 h-8 mb-4">
                            {repo.description || 'No descriptive summary added to this repository.'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-brand-on-surface-variant/60 pt-2 border-t border-white/5">
                          {repo.language && (
                            <span className="flex items-center gap-1 font-mono font-medium text-brand-primary">
                              <FileCode size={11} /> {repo.language}
                            </span>
                          )}
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-0.5"><Star size={11} className="text-yellow-400" /> {repo.stargazers_count}</span>
                            <span className="flex items-center gap-0.5"><GitPullRequest size={11} /> {repo.forks_count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Visual Git Workflow Simulator Section */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-tertiary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Title */}
        <div className="flex items-center gap-3 border-b border-white/5 pb-5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-surface-container flex items-center justify-center text-brand-tertiary">
            <GitBranch size={20} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white">Interactive Git Playground &amp; Tree Visualizer</h2>
            <p className="text-xs text-brand-on-surface-variant/80">Experiment with tracking, staging, committing and pushing file changes to simulate a real-world pipeline.</p>
          </div>
        </div>

        {/* Visualizer Grid layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Column 1: Git Command Actions Panel */}
          <div className="space-y-6">
            <h3 className="text-xs font-display font-bold uppercase tracking-widest text-brand-primary">Command Actions</h3>
            
            <div className="space-y-4">
              
              {/* Step 1: Modify File */}
              <div className="p-3.5 bg-brand-surface-container/40 border border-white/5 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Step 1: Code Modifications</span>
                  <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded ${gitStatus === 'untracked' ? 'bg-brand-error/20 text-brand-error' : 'bg-green-500/15 text-green-400'}`}>
                    {gitStatus === 'untracked' ? 'Unstaged changes' : 'No untracked work'}
                  </span>
                </div>
                <div className="text-xs text-brand-on-surface-variant font-mono bg-black/20 p-2 rounded">
                  File: <span className="text-brand-tertiary">{modifiedFile}</span>
                </div>
                <button 
                  id="git-playground-modify-btn"
                  onClick={handleModifyFile}
                  className="w-full py-2 bg-brand-surface-container hover:bg-brand-surface-container-high text-brand-on-surface hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Clock size={12} /> Modify Random File
                </button>
              </div>

              {/* Step 2: git add */}
              <div className="p-3.5 bg-brand-surface-container/40 border border-white/5 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Step 2: Stage changes</span>
                  <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded ${gitStatus === 'staged' ? 'bg-brand-primary/20 text-brand-primary' : 'bg-brand-on-surface-variant/15 text-brand-on-surface-variant'}`}>
                    {gitStatus === 'staged' ? 'Staged' : 'Not staged'}
                  </span>
                </div>
                <button 
                  id="git-playground-add-btn"
                  disabled={gitStatus !== 'untracked'}
                  onClick={handleGitAdd}
                  className="btn-primary w-full py-2 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
                >
                  git add {modifiedFile.split('/').pop()}
                </button>
              </div>

              {/* Step 3: git commit */}
              <div className="p-3.5 bg-brand-surface-container/40 border border-white/5 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Step 3: Commit changes</span>
                  <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded ${gitStatus === 'committed' ? 'bg-green-500/15 text-green-400' : 'bg-brand-on-surface-variant/15 text-brand-on-surface-variant'}`}>
                    {gitStatus === 'committed' ? 'Committed' : 'Pending'}
                  </span>
                </div>
                <div className="space-y-1">
                  <label htmlFor="commit-msg-input" className="text-[10px] text-brand-on-surface-variant/80 uppercase font-bold">Commit Message</label>
                  <input 
                    id="commit-msg-input"
                    type="text"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="feat: add cool feature"
                    className="w-full bg-brand-bg/80 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-brand-on-surface font-mono"
                  />
                </div>
                <button 
                  id="git-playground-commit-btn"
                  disabled={gitStatus !== 'staged'}
                  onClick={handleGitCommit}
                  className="btn-primary w-full py-2 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
                >
                  git commit -m "..."
                </button>
              </div>

              {/* Step 4: git push */}
              <div className="p-3.5 bg-brand-surface-container/40 border border-white/5 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Step 4: Push to Origin</span>
                  <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded ${gitStatus === 'pushed' ? 'bg-green-500/15 text-green-400' : 'bg-brand-on-surface-variant/15 text-brand-on-surface-variant'}`}>
                    {gitStatus === 'pushed' ? 'Remote synced' : 'Not pushed'}
                  </span>
                </div>
                <button 
                  id="git-playground-push-btn"
                  disabled={gitStatus !== 'committed'}
                  onClick={handleGitPush}
                  className="btn-primary w-full py-2 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
                >
                  git push origin {currentBranch}
                </button>
              </div>

            </div>

            <button 
              id="git-playground-reset-btn"
              onClick={resetSimulator}
              className="text-xs text-brand-on-surface-variant hover:text-white flex items-center gap-1 transition-colors mx-auto"
            >
              <RotateCcw size={12} /> Reset Playground State
            </button>
          </div>

          {/* Column 2: Live Console Terminal Log */}
          <div className="space-y-6 lg:col-span-2 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-display font-bold uppercase tracking-widest text-brand-primary">Shell Terminal Execution</h3>
              
              <div className="bg-[#0b0e15] border border-white/5 rounded-xl p-4 font-mono text-xs sm:text-sm h-60 overflow-y-auto pr-1 flex flex-col justify-between leading-relaxed text-brand-on-surface">
                <div className="space-y-2">
                  {commandLog.map((log, idx) => (
                    <div 
                      key={idx}
                      className={
                        log.startsWith('$') 
                          ? 'text-brand-primary font-semibold' 
                          : log.startsWith('✓') 
                            ? 'text-green-400' 
                            : log.includes('modified:') || log.includes('[File Changed]')
                              ? 'text-brand-error'
                              : 'text-brand-on-surface-variant'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Commit Branch Node tree list */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-xs font-display font-bold uppercase tracking-widest text-brand-tertiary flex items-center gap-1.5">
                <GitCommit size={14} /> Commit History Branch: {currentBranch}
              </h4>

              <div className="relative pl-6 border-l-2 border-brand-primary/20 space-y-4 pt-1">
                {commits.map((commit, idx) => (
                  <div key={commit.id} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-brand-bg border-2 border-brand-primary group-hover:bg-brand-tertiary transition-colors"></div>
                    
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-mono font-bold text-white group-hover:text-brand-primary transition-colors">{commit.message}</p>
                        <span className="text-[10px] text-brand-on-surface-variant/60 font-mono">Branch: {commit.branch} • {commit.timestamp}</span>
                      </div>
                      <span className="text-[10px] font-mono text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.5 rounded shrink-0">
                        {commit.hash}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
