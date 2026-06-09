/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { 
  Sun, 
  Moon, 
  Copy, 
  Check, 
  RotateCcw, 
  FileDown, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter, 
  Code, 
  LayoutGrid, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Info, 
  HeartHandshake, 
  Compass,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { DeveloperData } from "./types";
import { TEMPLATE_LIST } from "./templates";

// Default Sample Developer Data
const SAMPLE_DEVELOPER: DeveloperData = {
  name: "Sarah Chen",
  title: "Lead Full Stack Engineer",
  company: "StackForge Inc.",
  email: "sarah@stackforge.dev",
  phone: "+1 (555) 019-2834",
  website: "https://stackforge.dev",
  github: "sarahchen",
  linkedin: "sarahchen-dev",
  portfolio: "https://sarahchen.dev",
  twitter: "sarahchen_dev",
  profilePicture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
  skills: "React, Node.js, TypeScript, Tailwind"
};

// Clean blank slate helper
const BLANK_DEVELOPER: DeveloperData = {
  name: "",
  title: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  github: "",
  linkedin: "",
  portfolio: "",
  twitter: "",
  profilePicture: "",
  skills: ""
};

// Beautiful predefined avatars for developer convenience
const AVATAR_PRESETS = [
  {
    name: "Sarah (Default)",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Alex (Backend)",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Marcus (Ops)",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Aisha (Creative)",
    url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

// Post-process rendered HTML to safely remove empty/dangling elements when input fields are cleared
export function cleanSignatureHTML(htmlStr: string): string {
  let doc = htmlStr;

  // Remove empty images (e.g. empty profile picture)
  doc = doc.replace(/<img\b[^>]*src=["']\s*["'][^>]*>/gi, '');
  // Remove columns or frames left dry by missing avatars
  doc = doc.replace(/<td\b[^>]*align="center"[^>]*>\s*<\/td>/gi, '');

  // Remove empty interactive anchors (e.g. href="mailto:" or tel:)
  doc = doc.replace(/<a\b[^>]*href=["'](?:mailto:|tel:)?["'][^>]*>[\s\n]*<\/a>/gi, '');
  // Remove general empty standard inline tags
  doc = doc.replace(/<a\b[^>]*>[\s\n]*<\/a>/gi, '');
  doc = doc.replace(/<span\b[^>]*>[\s\n]*<\/span>/gi, '');

  // Clean dangling dividers starting with pipe "|", middot "•", etc.
  doc = doc.replace(/<span[^>]*>\s*\|\s*<\/span>/gi, '');
  doc = doc.replace(/<span[^>]*>\s*&nbsp;•&nbsp;\s*<\/span>/gi, '');
  
  // Clean up inline dangling pipes or bullets with text
  doc = doc.replace(/(&nbsp;)*\s*\|\s*(&nbsp;)*\s*(?:<\/div>|<\/td>|<\/span>)/gi, '$3');
  doc = doc.replace(/(&nbsp;)*\s*•\s*(&nbsp;)*\s*(?:<\/div>|<\/td>|<\/span>)/gi, '$3');
  doc = doc.replace(/(&nbsp;)*\s*·\s*(&nbsp;)*\s*(?:<\/div>|<\/td>|<\/span>)/gi, '$3');
  
  // Clean empty links preceded by an emoji (like 📧, 📱, 🌐, etc.)
  doc = doc.replace(/(?:📧|📱|🌐|📞|💻|🚀|💼)\s*(?:&nbsp;)?\s*(?:&middot;)?\s*<a\b[^>]*>[\s\n]*<\/a>/gi, '');
  doc = doc.replace(/(?:📧|📱|🌐|📞|💻|🚀|💼)\s*(?:&nbsp;)?\s*(?:&middot;)?\s*<span\b[^>]*>[\s\n]*<\/span>/gi, '');
  
  // Clean leftover dangling labels and empty wrappers
  doc = doc.replace(/📱\s*<strong>Phone:<\/strong>\s*(?:<span[^>]*>\s*<\/span>)?\s*(\||,|&nbsp;•&nbsp;)?/gi, '');
  doc = doc.replace(/📧\s*<strong>Email:<\/strong>\s*(?:<span[^>]*>\s*<\/span>)?\s*(\||,|&nbsp;•&nbsp;)?/gi, '');
  doc = doc.replace(/🚀\s*<strong>Portfolio:<\/strong>\s*(?:<span[^>]*>\s*<\/span>)?\s*(\||,|&nbsp;•&nbsp;)?/gi, '');
  doc = doc.replace(/🌐\s*<strong>Web:<\/strong>\s*(?:<span[^>]*>\s*<\/span>)?\s*/gi, '');
  
  // General labels
  doc = doc.replace(/<strong>Phone:<\/strong>\s*(?:<span[^>]*>\s*<\/span>)?\s*(\||,|&nbsp;•&nbsp;)?/gi, '');
  doc = doc.replace(/<strong>Email:<\/strong>\s*(?:<span[^>]*>\s*<\/span>)?\s*(\||,|&nbsp;•&nbsp;)?/gi, '');
  doc = doc.replace(/<strong>Portfolio:<\/strong>\s*(?:<span[^>]*>\s*<\/span>)?\s*(\||,|&nbsp;•&nbsp;)?/gi, '');
  
  // Handle empty divs containing only icons/emojis/brs left from a cleared value
  doc = doc.replace(/<div[^>]*>\s*(?:📧|📱|🌐|📞|💻|🚀|💼|📞|💻)\s*(?:<span[^>]*>\s*<\/span>)?\s*<\/div>/gi, '');
  doc = doc.replace(/<div[^>]*>\s*(?:&nbsp;|\s)*\s*<\/div>/gi, '');
  doc = doc.replace(/<span[^>]*>\s*(?:&nbsp;|\s)*\s*<\/span>/gi, '');
  doc = doc.replace(/<p[^>]*>\s*(?:&nbsp;|\s)*\s*<\/p>/gi, '');

  // Remove trailing and leading spaces/spacers
  doc = doc.replace(/&nbsp;•&nbsp;\s*(&nbsp;•&nbsp;\s*)+/gi, '&nbsp;•&nbsp;');
  doc = doc.replace(/\s*\|\s*\|\s*/g, ' | ');
  
  // Clean terminal style empty keys
  doc = doc.replace(/<span[^>]*>\[Phone\]<\/span>:\s*(?:<span[^>]*>\s*<\/span>)?\s*(\b)?/gi, '');
  doc = doc.replace(/<span[^>]*>\[Email\]<\/span>:\s*(?:<span[^>]*>\s*<\/span>)?\s*(\b)?/gi, '');
  doc = doc.replace(/<span[^>]*>\[GitHub\]<\/span>:\s*(?:<a[^>]*>\s*<\/a>)?/gi, '');
  doc = doc.replace(/<span[^>]*>\[URL\]<\/span>:\s*(?:<a[^>]*>\s*<\/a>)?/gi, '');

  // Clean empty company/title connections
  doc = doc.replace(/\s*@\s*<\/strong>/gi, '</strong>');
  doc = doc.replace(/\s*@\s*<\/span>/gi, '</span>');
  doc = doc.replace(/\s*@\s*<\/div>/gi, '</div>');
  doc = doc.replace(/\s*at\s*<\/strong>/gi, '</strong>');
  doc = doc.replace(/\s*at\s*<\/span>/gi, '</span>');
  doc = doc.replace(/\s*at\s*<\/div>/gi, '</div>');

  // If name, title or other key values are cleared, clean up some specific trailing residues:
  doc = doc.replace(/<span style="font-size: 11px; color: [^;]+; display: block; padding-top: 4px;">\s*<\/span>/gi, '');
  doc = doc.replace(/(?:<br\s*\/?>)+/gi, '<br />');
  
  // Empty table layouts
  doc = doc.replace(/<tr>\s*<td[^>]*>\s*<\/td>\s*<\/tr>/gi, '');

  // Clean dangling list borders and tables left over with just whitespace or margins
  return doc;
}

export default function App() {
  // Application states with safe LocalStorage loaders
  const [developerData, setDeveloperData] = useState<DeveloperData>(() => {
    try {
      const saved = localStorage.getItem("dev_signature_data");
      return saved ? JSON.parse(saved) : SAMPLE_DEVELOPER;
    } catch (e) {
      return SAMPLE_DEVELOPER;
    }
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("dev_signature_template_id");
      return saved || "minimal-left";
    } catch (e) {
      return "minimal-left";
    }
  });

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("dev_signature_dark_theme");
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");
  
  // Feedbacks
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<"html" | "text" | "download" | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("dev_signature_data", JSON.stringify(developerData));
    } catch (e) {}
  }, [developerData]);

  useEffect(() => {
    try {
      localStorage.setItem("dev_signature_template_id", selectedTemplateId);
    } catch (e) {}
  }, [selectedTemplateId]);

  useEffect(() => {
    try {
      localStorage.setItem("dev_signature_dark_theme", JSON.stringify(isDarkTheme));
    } catch (e) {}
  }, [isDarkTheme]);

  // Field change handler
  const handleInputChange = (field: keyof DeveloperData, value: string) => {
    setDeveloperData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Find active template helper
  const activeTemplate = useMemo(() => {
    return TEMPLATE_LIST.find((t) => t.id === selectedTemplateId) || TEMPLATE_LIST[0];
  }, [selectedTemplateId]);

  // Generate rendering elements
  const signatureHTMLStr = useMemo(() => {
    const rawHTML = activeTemplate.renderHTML(developerData, isDarkTheme ? "dark" : "light");
    return cleanSignatureHTML(rawHTML);
  }, [activeTemplate, developerData, isDarkTheme]);

  const signaturePlainText = useMemo(() => {
    let raw = activeTemplate.renderPlainText(developerData);
    // Cleanup double separators
    raw = raw.replace(/Email:\s*\|/gi, '');
    raw = raw.replace(/Phone:\s*\|/gi, '');
    raw = raw.replace(/GitHub:\s*\|/gi, '');
    raw = raw.replace(/LinkedIn:\s*\|/gi, '');
    raw = raw.replace(/Portfolio:\s*\|/gi, '');
    raw = raw.replace(/\|\s*Email:\s*$/gi, '');
    raw = raw.replace(/\|\s*Phone:\s*$/gi, '');
    raw = raw.replace(/\|\s*GitHub:\s*$/gi, '');
    raw = raw.replace(/\|\s*LinkedIn:\s*$/gi, '');
    raw = raw.replace(/\|\s*Portfolio:\s*$/gi, '');
    raw = raw.replace(/@\s*$/gi, '');
    raw = raw.replace(/\|\s*\|/g, '|');
    raw = raw.replace(/\|\s*$/g, '');
    return raw.trim();
  }, [activeTemplate, developerData]);

  // Actions trigger: Copy rich text signature for direct paste into Gmail/Outlook settings
  const handleCopyRichSignature = async () => {
    try {
      const htmlBlob = new Blob([signatureHTMLStr], { type: "text/html" });
      const plainBlob = new Blob([signaturePlainText], { type: "text/plain" });
      
      const item = new ClipboardItem({
        "text/html": htmlBlob,
        "text/plain": plainBlob,
      });
      await navigator.clipboard.write([item]);
      setLastAction("html");
      showToast("📋 Rich-Text Signature copied! Go to Gmail/Outlook settings and simply Paste (Ctrl+V / Cmd+V).");
    } catch (err) {
      // Fallback for browsers/environments blocking ClipboardItem in sandboxed iframes
      try {
        const container = document.createElement("div");
        container.innerHTML = signatureHTMLStr;
        container.style.position = "fixed";
        container.style.pointerEvents = "none";
        container.style.opacity = "0";
        container.style.top = "-9999px";
        document.body.appendChild(container);
        
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(container);
        selection?.removeAllRanges();
        selection?.addRange(range);
        
        const successful = document.execCommand("copy");
        selection?.removeAllRanges();
        document.body.removeChild(container);
        
        if (successful) {
          setLastAction("html");
          showToast("📋 Rich-Text Signature copied beautifully! Go to your email client and just paste it (Ctrl+V).");
        } else {
          throw new Error("execCommand failed");
        }
      } catch (fallbackErr) {
        // Ultimate fallback to copy raw text to make sure they get something
        try {
          await navigator.clipboard.writeText(signatureHTMLStr);
          setLastAction("html");
          showToast("🚀 Copied as raw HTML code (Rich-text blocked by browser rules). Please download the HTML file or paste code directly.");
        } catch (charError) {
          showToast("❌ Clipboard copy failed. Please download the HTML file using the download button.");
        }
      }
    }
  };

  // Actions trigger: Copy raw HTML code
  const handleCopyRawHTML = async () => {
    try {
      await navigator.clipboard.writeText(signatureHTMLStr);
      showToast("💻 Raw HTML Code copied! Paste into HTML editors or advanced templates.");
    } catch (err) {
      showToast("❌ Unable to copy code.");
    }
  };

  // Actions trigger: Plain text fallback copy
  const handleCopyPlainText = async () => {
    try {
      await navigator.clipboard.writeText(signaturePlainText);
      setLastAction("text");
      showToast("📝 Fallback plain-text copied to clipboard.");
    } catch (err) {
      showToast("❌ Could not copy plain text.");
    }
  };

  // Actions trigger: Download standalone HTML
  const handleDownloadHTML = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([signatureHTMLStr], { type: "text/html;charset=utf-8" });
      element.href = URL.createObjectURL(file);
      element.download = `signature-${selectedTemplateId}-${isDarkTheme ? "dark" : "light"}.html`;
      document.body.appendChild(element); // Required for Firefox
      element.click();
      document.body.removeChild(element);
      setLastAction("download");
      showToast("💾 Email signature HTML downloaded successfully!");
    } catch (err) {
      showToast("❌ File download failed.");
    }
  };

  // Quick helper to show temporary toast banner
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 5500);
  };

  // Preset loaders
  const handleResetForm = () => {
    setDeveloperData(BLANK_DEVELOPER);
    showToast("🧹 All form fields reset to blank!");
  };

  const handleLoadSample = () => {
    setDeveloperData(SAMPLE_DEVELOPER);
    showToast("✨ loaded default developer sample data (Sarah Chen).");
  };

  // Categories extraction for filtering thumbnails
  const categories = ["All", "Minimalist", "Creative", "Card", "Tech", "Professional"];

  const filteredTemplates = useMemo(() => {
    if (activeCategoryFilter === "All") return TEMPLATE_LIST;
    return TEMPLATE_LIST.filter((t) => t.category === activeCategoryFilter);
  }, [activeCategoryFilter]);

  return (
    <div 
      id="devsignature-app"
      className={`min-h-screen font-sans transition-all duration-500 pb-16 relative overflow-x-hidden ${
        isDarkTheme 
          ? "bg-[#0f172a] text-slate-100" 
          : "bg-slate-100/95 text-slate-900"
      }`}
    >
      {/* Aurora Ambient Frosted Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className={`absolute rounded-full w-[450px] h-[450px] top-[-10%] left-[-10%] blur-[130px] transition-all duration-1000 ${
            isDarkTheme 
              ? "bg-indigo-500/10" 
              : "bg-indigo-300/30"
          }`}
        />
        <div 
          className={`absolute rounded-full w-[500px] h-[500px] top-[25%] right-[-10%] blur-[150px] transition-all duration-1000 ${
            isDarkTheme 
              ? "bg-blue-500/10" 
              : "bg-purple-300/25"
          }`}
        />
        <div 
          className={`absolute rounded-full w-[400px] h-[400px] bottom-[-5%] left-[25%] blur-[120px] transition-all duration-1000 ${
            isDarkTheme 
              ? "bg-emerald-500/5" 
              : "bg-emerald-300/20"
          }`}
        />
      </div>
      {/* Dynamic Toast feedback */}
      {toastMessage && (
        <div 
          id="toast-notification"
          className="fixed top-6 right-6 z-50 animate-bounce max-w-md bg-slate-900 text-white dark:bg-white dark:text-slate-950 p-4 rounded-xl shadow-2xl border border-slate-700/55 flex items-start gap-3"
        >
          <div className="bg-emerald-500 rounded-full p-1 text-white">
            <Check className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">{toastMessage}</p>
            <p className="text-[11px] opacity-75 mt-1">
              Tip: Go to your Mail settings (Signature tab), delete old contents, and press Paste (Ctrl+V / Cmd+V)!
            </p>
          </div>
        </div>
      )}

      {/* Header element */}
      <header 
        id="app-header"
        className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-all duration-500 ${
          isDarkTheme 
            ? "border-white/10 bg-[#1e293b]/70 shadow-lg shadow-black/10 text-white" 
            : "border-white/30 bg-white/70 shadow-sm text-slate-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 rounded-lg p-2.5 text-white shadow-md flex items-center justify-center">
              <Code className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DevSignature
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-200/50 dark:border-indigo-900/45">
                  Dual-Theme
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Professional signature generator optimized for devs & engineers</p>
            </div>
          </div>

          {/* Sun / Moon Premium Toggle switch */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">Theme Switcher</span>
            <button
              id="theme-toggle-switch"
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`p-2.5 rounded-xl transition-all duration-300 relative border backdrop-blur-md ${
                isDarkTheme 
                  ? "bg-slate-800/80 border-white/10 hover:border-indigo-500/50 text-yellow-400" 
                  : "bg-white/80 border-slate-200/80 shadow-xs hover:border-indigo-500/50 text-indigo-600"
              }`}
              title="Toggle signature mode"
            >
              {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main id="app-workspace" className="max-w-7xl mx-auto px-4 mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 35% COLUMN - BUILDER FORM FIELDS */}
          <div className="lg:col-span-5 space-y-6">
            <div 
              id="builder-form-card"
              className={`rounded-2xl border p-6 shadow-xl backdrop-blur-xl transition-all duration-500 ${
                isDarkTheme 
                  ? "bg-[#1e293b]/60 border-white/10 shadow-black/20" 
                  : "bg-white/60 border-white/40 shadow-slate-200/50"
              }`}
            >
              <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-500" />
                  <span className="font-bold text-base tracking-tight">Configure Developer Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="reset-form-btn"
                    onClick={handleResetForm}
                    className="text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all font-medium"
                    title="Clear variables"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                  <button
                    id="load-sample-btn"
                    onClick={handleLoadSample}
                    className="text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all font-medium border border-blue-200/50 dark:border-blue-900/50"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                    Load Sample
                  </button>
                </div>
              </div>

              {/* Form Input Groups Grid */}
              <div className="space-y-4">
                
                {/* Name & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full Name</label>
                    <input
                      id="input-name"
                      type="text"
                      className={`w-full text-sm rounded-xl px-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                        isDarkTheme 
                          ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400 focus:bg-slate-900/90" 
                          : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500 focus:bg-white/95"
                      }`}
                      placeholder="e.g. Sarah Chen"
                      value={developerData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Job Title</label>
                    <input
                      id="input-title"
                      type="text"
                      className={`w-full text-sm rounded-xl px-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                        isDarkTheme 
                          ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400 focus:bg-slate-900/90" 
                          : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500 focus:bg-white/95"
                      }`}
                      placeholder="e.g. Lead Full Stack Engineer"
                      value={developerData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Company Name</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      id="input-company"
                      type="text"
                      className={`w-full text-sm rounded-xl pl-9 pr-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                        isDarkTheme 
                          ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400 focus:bg-slate-900/90" 
                          : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500 focus:bg-white/95"
                      }`}
                      placeholder="e.g. StackForge"
                      value={developerData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>
                </div>

                {/* Main Contacts (Email, Phone, Website) */}
                <div className="space-y-3 pt-2">
                  <span className="block text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Contact Channels</span>
                  
                  <div className="space-y-1">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <input
                        id="input-email"
                        type="email"
                        className={`w-full text-sm rounded-xl pl-9 pr-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                          isDarkTheme 
                            ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400 focus:bg-slate-900/90" 
                            : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500 focus:bg-white/95"
                        }`}
                        placeholder="sarah@stackforge.dev"
                        value={developerData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <input
                        id="input-phone"
                        type="text"
                        className={`w-full text-sm rounded-xl pl-9 pr-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                          isDarkTheme 
                            ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400" 
                            : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500"
                        }`}
                        placeholder="+1 (555) 019-2834"
                        value={developerData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <input
                        id="input-website"
                        type="url"
                        className={`w-full text-sm rounded-xl pl-9 pr-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                          isDarkTheme 
                            ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400" 
                            : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500"
                        }`}
                        placeholder="https://stackforge.dev"
                        value={developerData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Social Networks Custom inputs (GitHub, LinkedIn, Twitter/X, Portfolio) */}
                <div className="space-y-3 pt-2">
                  <span className="block text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Social Identities</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <input
                          id="input-github"
                          type="text"
                          className={`w-full text-sm rounded-xl pl-9 pr-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                            isDarkTheme 
                              ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400" 
                              : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500"
                          }`}
                          placeholder="GitHub Username"
                          value={developerData.github}
                          onChange={(e) => handleInputChange("github", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <input
                          id="input-linkedin"
                          type="text"
                          className={`w-full text-sm rounded-xl pl-9 pr-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                            isDarkTheme 
                              ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400" 
                              : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500"
                          }`}
                          placeholder="LinkedIn ID"
                          value={developerData.linkedin}
                          onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <input
                          id="input-portfolio"
                          type="url"
                          className={`w-full text-sm rounded-xl pl-9 pr-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                            isDarkTheme 
                              ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400" 
                              : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500"
                          }`}
                          placeholder="Portfolio URL"
                          value={developerData.portfolio}
                          onChange={(e) => handleInputChange("portfolio", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <Twitter className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <input
                          id="input-twitter"
                          type="text"
                          className={`w-full text-sm rounded-xl pl-9 pr-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                            isDarkTheme 
                              ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400" 
                              : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500"
                          }`}
                          placeholder="Twitter/X Handle"
                          value={developerData.twitter}
                          onChange={(e) => handleInputChange("twitter", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Avatar selector */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Profile Picture URL</label>
                  <input
                    id="input-profile-pic"
                    type="url"
                    className={`w-full text-sm rounded-xl px-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                      isDarkTheme 
                        ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400" 
                        : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500"
                    }`}
                    placeholder="e.g. Link to your public photo"
                    value={developerData.profilePicture}
                    onChange={(e) => handleInputChange("profilePicture", e.target.value)}
                  />

                  {/* Avatar Quick Presets Slider */}
                  <div>
                    <span className="text-[10px] text-slate-450 dark:text-slate-400 block mb-1 font-semibold">Or choose a quick demo face:</span>
                    <div className="flex flex-wrap gap-2">
                      {AVATAR_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          id={`avatar-preset-${idx}`}
                          onClick={() => handleInputChange("profilePicture", p.url)}
                          className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer select-none backdrop-blur-md ${
                            developerData.profilePicture === p.url
                              ? "bg-indigo-600 text-white border-indigo-600 font-semibold shadow-md shadow-indigo-600/10"
                              : "bg-white/50 border-slate-200/60 text-slate-600 hover:bg-white/80 dark:bg-slate-800/60 dark:border-white/5 dark:text-slate-300 dark:hover:bg-slate-800"
                          }`}
                        >
                          <img 
                            src={p.url} 
                            alt={p.name} 
                            className="h-3.5 w-3.5 rounded-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                          {p.name.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills custom badges */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Skills Badges</label>
                    <span className="text-[10px] text-slate-400">Comma-separated skills</span>
                  </div>
                  <input
                    id="input-skills"
                    type="text"
                    className={`w-full text-sm rounded-xl px-3 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-450 ${
                      isDarkTheme 
                        ? "bg-slate-900/60 border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-400" 
                        : "bg-white/70 border-slate-200/80 text-slate-950 placeholder-slate-400 focus:border-indigo-500"
                    }`}
                    placeholder="e.g. React, Node.js, Python, AWS"
                    value={developerData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                  />
                </div>

              </div>
            </div>
            
            {/* INSTRUCTIONS COMPONENT */}
            <div 
              id="instructive-banner"
              className={`rounded-2xl border p-5 space-y-3 backdrop-blur-md transition-all duration-500 ${
                isDarkTheme 
                  ? "bg-indigo-950/10 border-indigo-900/30" 
                  : "bg-indigo-50/40 border-indigo-100/60"
              }`}
            >
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Info className="h-4.5 w-4.5" />
                <span className="text-xs font-bold uppercase tracking-wider">How to import into Mail Clients</span>
              </div>
              <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400 list-inside list-disc leading-relaxed">
                <li>Choose a template card from the list below.</li>
                <li>Write or load custom developer properties.</li>
                <li>Press <b>Copy Signature (for Gmail & Outlook)</b> to securely copy the styled Rich HTML formatting representation on your clipboard.</li>
                <li>Go to <b>Gmail Signature Settings</b> (or outlook settings), make sure the signature field is empty, and trigger a direct Paste (<b>Ctrl+V</b> or <b>Cmd+V</b>). The formatted signature layout with all images, badges, and colored texts will render instantly!</li>
              </ul>
            </div>
          </div>

          {/* RIGHT 65% COLUMN - LIVE WORKSPACE SANDBOX & THEME PREVIEW */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* EMAIL CLIENT PREVIEW BLOCK */}
            <div 
              id="email-preview-card"
              className={`rounded-2xl border overflow-hidden shadow-xl backdrop-blur-xl transition-all duration-500 ${
                isDarkTheme 
                  ? "bg-[#1e293b]/65 border-white/10 shadow-black/30" 
                  : "bg-white/65 border-white/40 shadow-slate-200/80"
              }`}
            >
              {/* Fake Email Client Header bar */}
              <div className={`px-4 py-3.5 border-b text-xs text-slate-500 dark:text-slate-400 space-y-1 backdrop-blur-md transition-colors ${
                isDarkTheme 
                  ? "bg-slate-900/40 border-white/5" 
                  : "bg-white/40 border-slate-200/50"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded-full bg-red-400"></span>
                    <span className="inline-block h-3 w-3 rounded-full bg-yellow-400"></span>
                    <span className="inline-block h-3 w-3 rounded-full bg-green-400"></span>
                  </div>
                  <span className="font-semibold text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/20 dark:border-indigo-900/25">
                    Live Sandbox
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="font-semibold w-10 text-slate-450 dark:text-slate-400">From:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{developerData.email || "sarah@stackforge.dev"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold w-10 text-slate-450 dark:text-slate-400">Subject:</span>
                  <span className="text-slate-600 dark:text-slate-300 italic">DevSignature Draft — Modern Digital Card</span>
                </div>
              </div>

              {/* LIVE VIEWBOARD AREA */}
              <div 
                id="live-canvas-area"
                className={`p-6 sm:p-10 flex items-center justify-center min-h-[300px] transition-all duration-500 relative ${
                  isDarkTheme 
                    ? "bg-slate-950/20" 
                    : "bg-slate-50/20"
                }`}
              >
                {/* Render compiled signature inside its own premium frosted preview card container */}
                <div 
                  id="rendered-signature-wrapper"
                  className={`w-full max-w-2xl p-6 sm:p-10 rounded-2xl shadow-2xl border transition-all duration-500 ${
                    isDarkTheme 
                      ? "bg-[#1e293b]/90 backdrop-blur-md border-slate-700/80 shadow-black/40" 
                      : "bg-white/95 backdrop-blur-md border-white/50 shadow-slate-300/40"
                  }`}
                >
                  <div className="w-full max-w-full overflow-x-auto py-2">
                    <div dangerouslySetInnerHTML={{ __html: signatureHTMLStr }} />
                  </div>
                </div>
              </div>

              {/* ACTION EXPORT BUTTONS FLOOR */}
              <div className="bg-slate-50 dark:bg-slate-900/40 px-6 py-5 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <button
                    id="copy-rich-btn"
                    onClick={handleCopyRichSignature}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold text-sm tracking-wide shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Signature (for Gmail & Outlook)
                  </button>

                  <button
                    id="copy-raw-html-btn"
                    onClick={handleCopyRawHTML}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-all cursor-pointer ${
                      isDarkTheme ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
                    }`}
                  >
                    <Code className="h-4 w-4 text-indigo-500" />
                    Copy Raw HTML Code
                  </button>

                  <button
                    id="copy-text-btn"
                    onClick={handleCopyPlainText}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-all cursor-pointer ${
                      isDarkTheme ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
                    }`}
                  >
                    Plain Text
                  </button>
                </div>

                <button
                  id="download-html-btn"
                  onClick={handleDownloadHTML}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-xs transition-colors cursor-pointer`}
                  title="Export ready .html file for local offline storage"
                >
                  <FileDown className="h-4.5 w-4.5" />
                  Download HTML
                </button>
              </div>
            </div>

            {/* PLATFORM COMPATIBILITY DASHBOARD */}
            <div 
              id="compatibility-section"
              className={`rounded-2xl border p-5 space-y-4 backdrop-blur-xl transition-all duration-500 ${
                isDarkTheme 
                  ? "bg-[#1e293b]/50 border-white/5 shadow-lg shadow-black/15" 
                  : "bg-white/50 border-white/35 shadow-md shadow-slate-200/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-400">Email Client Compatibility</span>
                <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                  ● Fully Verified 100% Validated
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                {[
                  { name: "Gmail", rating: "Certified" },
                  { name: "Apple Mail", rating: "Compatible" },
                  { name: "MS Outlook", rating: "Certified" },
                  { name: "Yahoo Mail", rating: "Compatible" },
                  { name: "Thunderbird", rating: "Compatible" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    id={`client-badge-${index}`}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all backdrop-blur-md ${
                      isDarkTheme 
                        ? "bg-[#0f172a]/60 border-white/5 hover:border-white/10" 
                        : "bg-white/80 border-white/40 hover:bg-white/90 shadow-xs"
                    }`}
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 mb-1" />
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-250">{item.name}</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-400 mt-0.5">{item.rating}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* FULL WIDTH - PREMIUM TEMPLATE SELECTION FLOOR */}
        <div 
          id="full-width-templates-selector" 
          className="mt-16 pt-12 border-t border-slate-200/60 dark:border-white/5 space-y-6 relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-5.5 w-5.5 text-indigo-500 animate-pulse" />
                <h2 className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                  Select Premium Template Layout
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pick a responsive layout layout optimized with deep-tested inline styles across light or dark systems.
              </p>
            </div>
            <span id="templates-counter" className="self-start md:self-center text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-[#1e293b] dark:text-indigo-300 px-3.5 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 backdrop-blur-md">
              {TEMPLATE_LIST.length} Dual-Theme Layouts Loaded
            </span>
          </div>

          {/* Horizontal Scrollable Category Filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                id={`filter-pill-${cat}`}
                onClick={() => {
                  setActiveCategoryFilter(cat);
                  showToast(`📂 Filtered by ${cat} layouts`);
                }}
                className={`text-xs px-4 py-2.5 rounded-xl transition-all duration-200 font-bold whitespace-nowrap border cursor-pointer backdrop-blur-md ${
                  activeCategoryFilter === cat
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/15"
                    : isDarkTheme
                      ? "bg-[#1e293b]/40 hover:bg-[#1e293b]/70 border-white/5 text-slate-300"
                      : "bg-white/70 hover:bg-slate-50 border-slate-200/60 text-slate-650 shadow-xs"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 22+ Live-Preview Templates Grid in 3 columns for premium visibility */}
          <div 
            id="template-chooser-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[1200px] overflow-y-auto pr-2 pb-4 scrollbar-thin"
          >
            {filteredTemplates.map((template) => {
              const isActive = selectedTemplateId === template.id;
              
              return (
                <div
                  key={template.id}
                  id={`template-thumbnail-${template.id}`}
                  onClick={() => {
                    setSelectedTemplateId(template.id);
                    showToast(`🎨 Activated "${template.name}" layout! Preview updated.`);
                  }}
                  className={`cursor-pointer group p-5 rounded-2xl border text-left transition-all duration-300 relative select-none backdrop-blur-md flex flex-col justify-between ${
                    isActive
                      ? isDarkTheme 
                        ? "bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-500/10 scale-[0.99]"
                        : "bg-indigo-50/40 border-indigo-500 shadow-lg scale-[0.99]"
                      : isDarkTheme
                        ? "bg-[#1e293b]/55 border-white/5 hover:border-white/10 hover:bg-[#1e293b]/85"
                        : "bg-white/55 border-white/35 hover:border-indigo-300 hover:bg-white/85 hover:shadow-xs"
                  }`}
                >
                  <div>
                    {/* Active indicator dot */}
                    {isActive && (
                      <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"></div>
                    )}

                    <div className="flex items-center gap-2 justify-between">
                      <span className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {template.name}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                        template.category === "Tech" 
                          ? "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/10" 
                          : template.category === "Creative"
                            ? "bg-purple-100/80 text-purple-800 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200/10"
                            : template.category === "Card"
                              ? "bg-amber-100/80 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/10"
                              : "bg-slate-100/80 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400"
                      }`}>
                        {template.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed mb-4">
                      {template.description}
                    </p>
                  </div>

                  {/* LIVE RENDERED EMBEDDED TEMPLATE COMPONENT */}
                  <div 
                    className={`rounded-xl border p-3 sm:p-4 overflow-x-auto max-w-full ${
                      isActive
                        ? isDarkTheme 
                          ? "bg-slate-950/60 border-indigo-500/20" 
                          : "bg-white border-indigo-200"
                        : isDarkTheme
                          ? "bg-slate-950/30 border-white/5" 
                          : "bg-slate-50/50 border-slate-200/40"
                    }`}
                  >
                    <div 
                      className="w-full overflow-x-auto scrollbar-thin pointer-events-none origin-top-left"
                      dangerouslySetInnerHTML={{ 
                        __html: cleanSignatureHTML(template.renderHTML(developerData, isDarkTheme ? "dark" : "light")) 
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-1 mt-4 text-xs text-indigo-500 dark:text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>{isActive ? "Currently Active Layout" : "Click to Select Layout"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer 
        id="app-footer"
        className={`max-w-7xl mx-auto px-4 mt-20 border-t pt-8 text-center text-xs space-y-2 transition-all duration-500 relative z-10 pb-12 ${
          isDarkTheme ? "border-white/5 text-slate-500" : "border-slate-200 text-slate-500"
        }`}
      >
        <p className="font-semibold tracking-wide text-slate-700 dark:text-slate-400">
          ✨ 22 Dual-Theme Premium Templates | Gmail, Yahoo, Microsoft Outlook, Apple Mail & Thunderbird Ready
        </p>
        <p className="opacity-80">
          DevSignature was built specifically for developers to showcase high-availability identities. Simply copy clean HTML, paste, and enjoy.
        </p>
      </footer>
    </div>
  );
}
