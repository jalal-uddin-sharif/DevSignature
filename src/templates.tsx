/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeveloperData, SignatureTemplate } from "./types";

// Safety checks for text fields to prevent broken layout on empty inputs
const safeStr = (val: string, fallback: string = "") => {
  if (val === undefined || val === null) return fallback;
  return val.trim();
};

// Helper to split and clean skill badges
const parseSkills = (skills: string): string[] => {
  if (!skills) return [];
  return skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
};

export const TEMPLATE_LIST: {
  id: string;
  name: string;
  description: string;
  category: "Minimalist" | "Creative" | "Card" | "Tech" | "Professional";
  renderHTML: (data: DeveloperData, theme: "light" | "dark") => string;
  renderPlainText: (data: DeveloperData) => string;
}[] = [
  {
    id: "minimal-left",
    name: "Minimal Left Aligned",
    description: "Sleek and professional with a solid vertical colored accent bar.",
    category: "Minimalist",
    renderPlainText: (d) => `${d.name} | ${d.title} @ ${d.company}\nEmail: ${d.email} | Phone: ${d.phone}\nGitHub: ${d.github} | LinkedIn: ${d.linkedin}\nPortfolio: ${d.portfolio}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0f172a" : "#ffffff";
      const textPrimary = isDark ? "#f8fafc" : "#0f172a";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accentColor = isDark ? "#38bdf8" : "#2563eb"; // Cyan in dark, Blue in light
      const borderTheme = isDark ? "#334155" : "#e2e8f0";
      const skills = parseSkills(d.skills);

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${textPrimary}; font-size: 14px; max-width: 520px; width: 100%; border-radius: 8px; border: 1px solid ${borderTheme};">
          <tr>
            <td style="padding: 20px;">
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="top">
                  <!-- Vertical Accent Bar -->
                  <td width="4" style="background-color: ${accentColor}; width: 4px; border-radius: 4px;"></td>
                  <td width="16" style="width: 16px;"></td>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <td style="font-size: 18px; font-weight: 700; color: ${textPrimary}; line-height: 1.2;">
                          ${safeStr(d.name, "Sarah Chen")}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: ${accentColor}; font-weight: 600; padding-top: 2px;">
                          ${safeStr(d.title, "Lead Full Stack Engineer")}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: ${textSecondary}; font-weight: 500; padding-top: 1px;">
                          ${safeStr(d.company, "StackForge")}
                        </td>
                      </tr>
                      <tr>
                        <td height="12"></td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; line-height: 1.6; color: ${textSecondary};">
                          <span style="color: ${accentColor}; font-weight: bold; margin-right: 4px;">📧</span> <a href="mailto:${d.email}" style="color: ${textSecondary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                          ${d.phone ? `<span style="margin: 0 8px; color: ${borderTheme};">|</span> <span style="color: ${accentColor}; font-weight: bold; margin-right: 4px;">📱</span> <span style="color: ${textSecondary};">${d.phone}</span>` : ""}
                          ${d.website ? `<br><span style="color: ${accentColor}; font-weight: bold; margin-right: 4px;">🌐</span> <a href="${d.website}" target="_blank" style="color: ${accentColor}; text-decoration: none; font-weight: 500;">${d.website.replace(/^https?:\/\//, "")}</a>` : ""}
                        </td>
                      </tr>
                      <!-- Social Links Row -->
                      <tr>
                        <td style="padding-top: 12px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              ${d.github ? `<td style="padding-right: 12px;"><a href="https://github.com/${d.github}" target="_blank" style="background-color: ${isDark ? "#1e293b" : "#f1f5f9"}; color: ${textPrimary}; border-radius: 4px; padding: 4px 8px; font-size: 11px; text-decoration: none; font-weight: 600; display: inline-block; border: 1px solid ${borderTheme};">🐙 GitHub</a></td>` : ""}
                              ${d.linkedin ? `<td style="padding-right: 12px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="background-color: ${isDark ? "#1e293b" : "#f1f5f9"}; color: ${accentColor}; border-radius: 4px; padding: 4px 8px; font-size: 11px; text-decoration: none; font-weight: 600; display: inline-block; border: 1px solid ${borderTheme};">💼 LinkedIn</a></td>` : ""}
                              ${d.portfolio ? `<td><a href="${d.portfolio}" target="_blank" style="background-color: ${accentColor}; color: #ffffff; border-radius: 4px; padding: 4px 8px; font-size: 11px; text-decoration: none; font-weight: 600; display: inline-block;">🚀 Portfolio</a></td>` : ""}
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${skills.length > 0 ? `
                      <tr>
                        <td style="padding-top: 12px; font-size: 11px; color: ${textSecondary};">
                          <span style="font-weight: 600; color: ${textPrimary}; text-transform: uppercase; font-size: 10px; tracking: 0.05em; display: inline-block; margin-right: 6px;">Skills:</span>
                          ${skills.map(s => `<span style="background-color: ${isDark ? "#1e293b" : "#f8fafc"}; padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid ${borderTheme}; font-family: monospace;">${s}</span>`).join("")}
                        </td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "centered-avatar",
    name: "Centered with Avatar",
    description: "Centered, elegant cards perfect for a high-impact symmetrical design.",
    category: "Card",
    renderPlainText: (d) => d.name + "\n" + d.title + " @ " + d.company + "\n" + d.email,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#111827" : "#fafbfc";
      const textPrimary = isDark ? "#ffffff" : "#1f2937";
      const textSecondary = isDark ? "#9ca3af" : "#4b5563";
      const accent = isDark ? "#10b981" : "#059669"; // Emerald focus
      const pillBg = isDark ? "#1f2937" : "#ffffff";
      const borderTheme = isDark ? "#374151" : "#e5e7eb";
      const avatarUrl = safeStr(d.profilePicture, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150");

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, Helvetica, sans-serif; color: ${textPrimary}; font-size: 14px; max-width: 480px; width: 100%; border-radius: 12px; border: 1px solid ${borderTheme}; padding: 24px; text-align: center;">
          <tr>
            <td align="center" style="text-align: center;">
              <!-- Avatar Frame -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <img src="${avatarUrl}" width="70" height="70" alt="${d.name}" style="border-radius: 50%; object-fit: cover; border: 3px solid ${accent}; display: block;" referrerPolicy="no-referrer" />
                  </td>
                </tr>
              </table>
              
              <div style="font-size: 19px; font-weight: 700; color: ${textPrimary}; margin-top: 4px;">
                ${safeStr(d.name, "Sarah Chen")}
              </div>
              <div style="font-size: 13px; color: ${accent}; font-weight: 600; margin-top: 2px;">
                ${safeStr(d.title, "Lead Full Stack Engineer")}
              </div>
              <div style="font-size: 12px; color: ${textSecondary}; margin-top: 1px;">
                ${safeStr(d.company, "StackForge")}
              </div>

              <!-- Thin spacer -->
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin: 12px 0;">
                <tr>
                  <td style="border-top: 1px solid ${borderTheme};"></td>
                </tr>
              </table>

              <!-- Contact Grid as flat text row -->
              <div style="font-size: 12px; color: ${textSecondary}; line-height: 1.8;">
                💻 <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none; font-weight: 500;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                ${d.phone ? ` &nbsp;•&nbsp; 📱 <span style="color: ${textPrimary}; font-weight: 500;">${d.phone}</span>` : ""}
                ${d.website ? `<br>🌐 <a href="${d.website}" target="_blank" style="color: ${accent}; text-decoration: none; font-weight: 600;">${d.website.replace(/^https?:\/\//, "")}</a>` : ""}
              </div>

              <!-- Social Elements centered row -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 12px auto 0 auto;">
                <tr>
                  ${d.github ? `<td style="padding: 0 4px;"><a href="https://github.com/${d.github}" target="_blank" style="background-color: ${pillBg}; color: ${textPrimary}; border: 1px solid ${borderTheme}; border-radius: 20px; padding: 4px 10px; font-size: 11px; text-decoration: none; font-weight: 600; display: inline-block;">GitHub</a></td>` : ""}
                  ${d.linkedin ? `<td style="padding: 0 4px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="background-color: ${pillBg}; color: ${accent}; border: 1px solid ${borderTheme}; border-radius: 20px; padding: 4px 10px; font-size: 11px; text-decoration: none; font-weight: 600; display: inline-block;">LinkedIn</a></td>` : ""}
                  ${d.twitter ? `<td style="padding: 0 4px;"><a href="https://twitter.com/${d.twitter}" target="_blank" style="background-color: ${isDark ? "#2563eb" : "#1d9bf0"}; color: #ffffff; border-radius: 20px; padding: 4px 10px; font-size: 11px; text-decoration: none; font-weight: 600; display: inline-block;">X</a></td>` : ""}
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "side-by-side",
    name: "Side-by-Side Classic",
    description: "Compact split signature. Avatar on left, contact info and details on right.",
    category: "Professional",
    renderPlainText: (d) => `${d.name} - ${d.title} @ ${d.company}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0f172a" : "#fafafa";
      const textPrimary = isDark ? "#f1f5f9" : "#1e293b";
      const textSecondary = isDark ? "#94a3b8" : "#64748b";
      const accent = isDark ? "#6366f1" : "#4f46e5"; // Indigo focus
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";
      const avatarUrl = safeStr(d.profilePicture, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150");

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 520px; width: 100%; border-radius: 12px; border: 1px solid ${borderTheme};">
          <tr>
            <td style="padding: 20px;">
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="middle">
                  <!-- Avatar Left -->
                  <td width="90" align="center" style="width: 90px; text-align: center; padding-right: 18px;">
                    <img src="${avatarUrl}" width="80" height="80" alt="${d.name}" style="border-radius: 12px; object-fit: cover; display: block; border: 1px solid ${borderTheme};" referrerPolicy="no-referrer" />
                  </td>
                  <!-- Vertical Separator line -->
                  <td width="1" style="background-color: ${borderTheme}; width: 1px; height: 80px;"></td>
                  <!-- Contact info Right -->
                  <td style="padding-left: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <td style="font-size: 17px; font-weight: 700; color: ${textPrimary}; line-height: 1.2;">
                          ${safeStr(d.name, "Sarah Chen")}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; color: ${accent}; font-weight: 600; padding-top: 2px; text-transform: uppercase; letter-spacing: 0.05em;">
                          ${safeStr(d.title, "Lead Full Stack Engineer")}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; color: ${textSecondary}; padding-top: 1px;">
                          ${safeStr(d.company, "StackForge")}
                        </td>
                      </tr>
                      <tr>
                        <td height="10"></td>
                      </tr>
                      <tr>
                        <td style="line-height: 1.6; color: ${textSecondary}; font-size: 12px;">
                          <div style="margin-bottom: 2px;">📞 <span style="color: ${textPrimary};">${safeStr(d.phone, "+1 (555) 019-2834")}</span></div>
                          <div style="margin-bottom: 2px;">📧 <a href="mailto:${d.email}" style="color: ${accent}; text-decoration: none; font-weight: 500;">${safeStr(d.email, "sarah@stackforge.dev")}</a></div>
                          ${d.website ? `<div>🌐 <a href="${d.website}" target="_blank" style="color: ${textSecondary}; text-decoration: none;">${d.website.replace(/^https?:\/\//, "")}</a></div>` : ""}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              ${d.github ? `<td style="padding-right: 8px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textSecondary}; font-weight: 600; text-decoration: none; font-size: 11px;">GitHub ↗</a></td>` : ""}
                              ${d.linkedin ? `<td style="padding-right: 8px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textSecondary}; font-weight: 600; text-decoration: none; font-size: 11px;">LinkedIn ↗</a></td>` : ""}
                              ${d.twitter ? `<td><a href="https://twitter.com/${d.twitter}" target="_blank" style="color: ${textSecondary}; font-weight: 600; text-decoration: none; font-size: 11px;">X ↗</a></td>` : ""}
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "gradient-border",
    name: "Gradient Border Cyber",
    description: "Framed by a beautiful, colorful border gradient. Retro meets modern neon.",
    category: "Creative",
    renderPlainText: (d) => `${d.name} (${d.title})`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#090d16" : "#ffffff";
      const textPrimary = isDark ? "#ffffff" : "#111827";
      const textSecondary = isDark ? "#94a3b8" : "#64748b";
      const gradientCSS = isDark 
        ? "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)" // pink violet blue
        : "linear-gradient(to right, #6366f1, #06b6d4)"; // indigo cyan
      const borderTheme = isDark ? "#1f2937" : "#f3f4f6";
      const skills = parseSkills(d.skills);

      return `
        <div style="background: ${gradientCSS}; padding: 2px; border-radius: 12px; max-width: 500px; width:100%;">
          <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; width: 100%; border-radius: 10px; border: none; padding: 20px;">
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                  <tr>
                    <td>
                      <span style="font-size: 18px; font-weight: 800; tracking: -0.02em; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                      <br>
                      <span style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: ${isDark ? "#f43f5e" : "#6366f1"};">${safeStr(d.title, "Lead Full Stack Engineer")}</span>
                      <span style="color: ${textSecondary}; font-size: 12px;"> @ ${safeStr(d.company, "StackForge")}</span>
                    </td>
                  </tr>
                  <tr>
                    <td height="12" style="border-bottom: 1px solid ${borderTheme};"></td>
                  </tr>
                  <tr>
                    <td height="12"></td>
                  </tr>
                  <tr>
                    <td style="line-height: 1.7; font-size: 12px; color: ${textSecondary};">
                      📱 <strong>Phone:</strong> ${safeStr(d.phone, "+1 (555) 019-2834")} <span style="margin: 0 6px;">|</span> 
                      📧 <strong>Email:</strong> <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                      ${d.portfolio ? `<br>🚀 <strong>Portfolio:</strong> <a href="${d.portfolio}" style="color: ${isDark ? "#38bdf8" : "#2563eb"}; text-decoration: none; font-weight:600;">${d.portfolio.replace(/^https?:\/\//, "")}</a>` : ""}
                    </td>
                  </tr>
                  <!-- Social row -->
                  <tr>
                    <td style="padding-top: 14px;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          ${d.github ? `<td style="padding-right: 14px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: 700;">🐙 GitHub</a></td>` : ""}
                          ${d.linkedin ? `<td style="padding-right: 14px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${isDark ? "#60a5fa" : "#0a66c2"}; text-decoration: none; font-weight: 700;">💼 LinkedIn</a></td>` : ""}
                          ${d.twitter ? `<td><a href="https://twitter.com/${d.twitter}" target="_blank" style="color: ${isDark ? "#38bdf8" : "#1d9bf0"}; text-decoration: none; font-weight: 700;">🐦 Twitter</a></td>` : ""}
                        </tr>
                      </table>
                    </td>
                  </tr>
                  ${skills.length > 0 ? `
                  <tr>
                    <td style="padding-top: 14px;">
                      ${skills.map(s => `<span style="background-color: ${isDark ? "#1e1a3a" : "#f1f5f9"}; color: ${isDark ? "#f43f5e" : "#5b21b6"}; padding: 3px 8px; border-radius: 99px; margin-right: 6px; font-size: 10px; font-weight: 700; border: 1px solid ${borderTheme};">${s}</span>`).join("")}
                    </td>
                  </tr>` : ""}
                </table>
              </td>
            </tr>
          </table>
        </div>
      `;
    }
  },
  {
    id: "tech-badges",
    name: "Tech Stack Badges",
    description: "Developer-centric format with prominent capsules for your core tech languages.",
    category: "Tech",
    renderPlainText: (d) => `${d.name} || ${d.skills}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0b0f19" : "#f8fafc";
      const textPrimary = isDark ? "#ffffff" : "#1e293b";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const badgeBg = isDark ? "#1e293b" : "#e0f2fe"; // bright blue-100 in light, slate-800 in dark
      const badgeText = isDark ? "#38bdf8" : "#0369a1";
      const accent = isDark ? "#38bdf8" : "#0284c7";
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";
      const skills = parseSkills(d.skills);

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'JetBrains Mono', monospace, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 520px; width: 100%; border-radius: 12px; border: 1px solid ${borderTheme}; padding: 20px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 12px; color: ${accent}; font-weight: 600;">&lt;developer&gt;</span>
                    <br>
                    <span style="font-size: 20px; font-weight: 800; color: ${textPrimary}; letter-spacing: -0.01em;">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="font-size: 12px; color: ${textSecondary};">${safeStr(d.title, "Lead Full Stack Engineer")} @ <strong>${safeStr(d.company, "StackForge")}</strong></span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; line-height: 1.6; color: ${textSecondary};">
                    📞 ${safeStr(d.phone, "+1 (555) 019-2834")}<br>
                    📧 <a href="mailto:${d.email}" style="color: ${accent}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a><br>
                    ${d.portfolio ? `🔗 <a href="${d.portfolio}" target="_blank" style="color: ${accent}; text-decoration: none;">${d.portfolio}</a>` : ""}
                  </td>
                </tr>
                <!-- Dynamic Tech pills -->
                ${skills.length > 0 ? `
                <tr>
                  <td style="padding-top: 14px;">
                    <div style="font-size: 10px; color: ${textSecondary}; font-weight: bold; margin-bottom: 6px; letter-spacing: 0.1em; text-transform: uppercase;">Stack:</div>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${skills.map(skill => `
                          <td style="padding-right: 6px; padding-bottom: 6px;">
                            <span style="background-color: ${badgeBg}; color: ${badgeText}; border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 500; display: inline-block;">${skill}</span>
                          </td>
                        `).join("")}
                      </tr>
                    </table>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding-top: 12px; font-size: 11px;">
                    ${d.github ? `<a href="https://github.com/${d.github}" target="_blank" style="color: ${accent}; text-decoration: none; margin-right: 12px;">$ github/${d.github}</a>` : ""}
                    ${d.linkedin ? `<a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${accent}; text-decoration: none;">$ linkedin/${d.linkedin}</a>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "two-column",
    name: "Two-Column Grid",
    description: "An organized asymmetric panel splitting contacts and social handles.",
    category: "Professional",
    renderPlainText: (d) => `${d.name} | ${d.title}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#1e293b" : "#ffffff";
      const textPrimary = isDark ? "#f8fafc" : "#0f172a";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accent = isDark ? "#10b981" : "#0d9488"; // emerald / teal accent
      const borderTheme = isDark ? "#334155" : "#e2e8f0";
      const avatarUrl = safeStr(d.profilePicture, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150");

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 530px; width: 100%; border-radius: 12px; border: 1px solid ${borderTheme}; padding: 20px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="top">
                  <!-- Col 1: Avatar + Name -->
                  <td width="150" style="width: 150px; padding-right: 18px; border-right: 1px dashed ${borderTheme};">
                    <img src="${avatarUrl}" width="70" height="70" alt="${d.name}" style="border-radius: 50%; object-fit: cover; border: 2px solid ${accent}; display: block; margin-bottom: 8px;" referrerPolicy="no-referrer" />
                    <span style="font-size: 16px; font-weight: bold; color: ${textPrimary}; display: block; line-height:1.2;">
                      ${safeStr(d.name, "Sarah Chen")}
                    </span>
                    <span style="font-size: 11px; color: ${textSecondary}; display: block; padding-top: 4px;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")}
                    </span>
                  </td>
                  
                  <!-- Col 2: Info details splitting into columns -->
                  <td style="padding-left: 20px;">
                    <div style="font-size: 10px; font-weight: bold; color: ${accent}; text-transform: uppercase; margin-bottom: 8px;">Contact & Links</div>
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr valign="top">
                        <td>
                          <!-- Left detail bullet point style -->
                          <div style="margin-bottom: 6px;">
                            <span style="color: ${accent};">📱</span> <span style="font-weight: 500;">${safeStr(d.phone, "+1 (555) 019-2834")}</span>
                          </div>
                          <div style="margin-bottom: 6px;">
                            <span style="color: ${accent};">📧</span> <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                          </div>
                          ${d.website ? `<div style="margin-bottom: 6px;"><span style="color: ${accent};">🌐</span> <a href="${d.website}" style="color: ${textPrimary}; text-decoration: none;">${d.website.replace(/^https?:\/\//, "")}</a></div>` : ""}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 4px; border-top: 1px dashed ${borderTheme};"></td>
                      </tr>
                      <tr>
                        <td>
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              ${d.github ? `<td style="padding-right: 12px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textSecondary}; text-decoration: none; font-weight: 600; font-size:11px;">🐙 GitHub/ ${d.github}</a></td>` : ""}
                              ${d.linkedin ? `<td><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textSecondary}; text-decoration: none; font-weight: 600; font-size:11px;">💼 LinkedIn</a></td>` : ""}
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "company-brand",
    name: "Company Branding",
    description: "Highly structured corporate style emphasizing company hierarchy and identity.",
    category: "Professional",
    renderPlainText: (d) => `${d.name} @ ${d.company}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#111827" : "#ffffff";
      const textPrimary = isDark ? "#ffffff" : "#111827";
      const textSecondary = isDark ? "#9ca3af" : "#4b5563";
      const accent = isDark ? "#3b82f6" : "#1d4ed8"; // classic royal blue
      const bdr = isDark ? "#374151" : "#e5e7eb";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: Arial, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 520px; width: 100%; border-radius: 4px; border: 1px solid ${bdr}; padding: 18px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <!-- Brand Ribbon Banner -->
                <tr>
                  <td style="font-size: 15px; font-weight: bold; color: ${accent}; text-transform: uppercase; letter-spacing: 0.08em; padding-bottom: 6px;">
                    🏢 ${safeStr(d.company, "StackForge").toUpperCase()}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 19px; font-weight: 700; color: ${textPrimary};">
                    ${safeStr(d.name, "Sarah Chen")}
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: ${textSecondary}; padding-bottom: 12px; font-style: italic;">
                    ${safeStr(d.title, "Lead Full Stack Engineer")}
                  </td>
                </tr>
                <tr>
                  <td height="1" style="background-color: ${bdr}; height: 1px;"></td>
                </tr>
                <tr>
                  <td height="10"></td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <td style="line-height: 1.6; color: ${textSecondary}; font-size: 12px;">
                          <strong>Email:</strong> <a href="mailto:${d.email}" style="color: ${accent}; text-decoration: underline;">${safeStr(d.email, "sarah@stackforge.dev")}</a> <span style="margin: 0 8px; color: ${bdr};">|</span>
                          <strong>Phone:</strong> ${safeStr(d.phone, "+1 (555) 019-2834")} <br>
                          ${d.portfolio ? `<strong>Portfolio:</strong> <a href="${d.portfolio}" target="_blank" style="color: ${textSecondary}; text-decoration: none;">${d.portfolio}</a>` : ""}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Social links nested row -->
                <tr>
                  <td style="padding-top: 10px;">
                    <span style="font-size: 11px; color: ${textSecondary}; font-weight: bold; margin-right: 12px;">NETWORKS:</span>
                    ${d.github ? `<a href="https://github.com/${d.github}" target="_blank" style="color: ${accent}; font-weight: bold; text-decoration: none; font-size: 12px; margin-right:12px;">GitHub</a>` : ""}
                    ${d.linkedin ? `<a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${accent}; font-weight: bold; text-decoration: none; font-size: 12px; margin-right:12px;">LinkedIn</a>` : ""}
                    ${d.twitter ? `<a href="https://twitter.com/${d.twitter}" target="_blank" style="color: ${accent}; font-weight: bold; text-decoration: none; font-size: 12px;">Twitter</a>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "open-source",
    name: "Open Source Contributor",
    description: "Features a dedicated GitHub contribution pill highlighting community work.",
    category: "Tech",
    renderPlainText: (d) => `${d.name} (GitHub Sponsor & Builder)`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#090d16" : "#fdfdfd";
      const textPrimary = isDark ? "#f3f4f6" : "#27272a";
      const textSecondary = isDark ? "#a1a1aa" : "#71717a";
      const accent = "#22c55e"; // GitHub Green focus
      const borderTheme = isDark ? "#27272a" : "#e4e4e7";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 12px; border: 1px solid ${borderTheme}; padding: 18px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="top">
                  <td>
                    <span style="background-color: rgba(34, 197, 94, 0.12); color: ${accent}; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: bold; tracking: 0.05em; display: inline-block; margin-bottom: 6px;">💚 OPEN SOURCE DEVELOPER</span>
                    <br>
                    <span style="font-size: 18px; font-weight: bold; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="color: ${textSecondary}; font-size: 12px;">${safeStr(d.title, "Lead Full Stack Engineer")} at ${safeStr(d.company, "StackForge")}</span>
                  </td>
                </tr>
                <tr>
                  <td height="10"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: ${textSecondary}; line-height: 1.5;">
                    📫 Write to: <a href="mailto:${d.email}" style="color: ${textPrimary}; text-textPrimary: none; font-weight: 600;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                    ${d.portfolio ? `<br>📂 Projects: <a href="${d.portfolio}" target="_blank" style="color: ${textPrimary}; text-decoration: none;">${d.portfolio.replace(/^https?:\/\//, "")}</a>` : ""}
                  </td>
                </tr>
                <!-- OS Callout banner -->
                <tr>
                  <td style="padding-top: 14px;">
                    <a href="https://github.com/${safeStr(d.github, d.name)}" target="_blank" style="background-color: ${isDark ? "#14532d" : "#dcfce7"}; border: 1px solid ${isDark ? "#15803d" : "#bbf7d0"}; border-radius: 6px; padding: 6px 12px; font-size: 12px; text-decoration: none; color: ${isDark ? "#4ade80" : "#15803d"}; display: block; font-weight: bold; text-align: center;">
                      💻 Visit Github @${safeStr(d.github, "sarahchen")} to Sponsor My Work
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "terminal",
    name: "Terminal Themed",
    description: "Styled like a developer's CLI prompt with syntax markers.",
    category: "Tech",
    renderPlainText: (d) => `~/${d.github} $ cat info.md`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#090d16" : "#fefdfa"; // retro code slate vs retro light typewriter yellow-white
      const textPrimary = isDark ? "#34d399" : "#1f2937"; // green text as CLI vs charcoal coding font
      const textSecondary = isDark ? "#a7f3d0" : "#4b5563";
      const consoleTitle = isDark ? "sarah@chen-terminal:~" : "guest@terminal:~/profile";
      const accent = isDark ? "#f43f5e" : "#e11d48"; // pink accent cursor
      const labelColor = isDark ? "#60a5fa" : "#0d9488"; // variable labels
      const borderTheme = isDark ? "#064e3b" : "#e5e7eb";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 8px; border: 2px solid ${borderTheme}; padding: 16px; box-shadow: ${isDark ? "0 4px 20px rgba(0,0,0,0.6)" : "0 4px 10px rgba(0,0,0,0.05)"};">
          <!-- Terminal Header Bar -->
          <tr>
            <td style="padding-bottom: 12px; border-bottom: 1px solid ${borderTheme}; font-size: 11px; color: ${textSecondary}; font-weight: bold;">
              🔴 &nbsp; 🟡 &nbsp; 🟢 &nbsp;&nbsp;&nbsp;&nbsp; <span style="font-family: monospace; opacity: 0.7;">${consoleTitle}</span>
            </td>
          </tr>
          <tr>
            <td height="12"></td>
          </tr>
          <tr>
            <td>
              <div style="font-size: 12px; color: ${textSecondary}; margin-bottom: 4px;">$ userinfo --fetch</div>
              <div style="font-size: 18px; font-weight: bold; color: ${textPrimary}; margin-before: 2px;">
                &gt; ${safeStr(d.name, "Sarah Chen")} <span style="animation: pulse 1s infinite; background-color: ${accent}; color: ${accent}; font-size: 16px;">_</span>
              </div>
              <div style="font-size: 12px; color: ${textSecondary}; padding-top: 4px;">
                <span style="color: ${labelColor}; font-weight: bold;">[Title]</span>: ${safeStr(d.title, "Lead Full Stack Engineer")}
                <br>
                <span style="color: ${labelColor}; font-weight: bold;">[Company]</span>: ${safeStr(d.company, "StackForge")}
              </div>
              
              <div style="font-size: 12px; color: ${textSecondary}; padding-top: 8px;">
                <span style="color: ${labelColor}; font-weight: bold;">[Email]</span>: <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                ${d.phone ? `<br><span style="color: ${labelColor}; font-weight: bold;">[Phone]</span>: ${d.phone}` : ""}
                ${d.github ? `<br><span style="color: ${labelColor}; font-weight: bold;">[GitHub]</span>: <a href="https://github.com/${d.github}" target="_blank" style="color: ${textPrimary}; text-decoration: underline;">@${d.github}</a>` : ""}
                ${d.portfolio ? `<br><span style="color: ${labelColor}; font-weight: bold;">[URL]</span>: <a href="${d.portfolio}" target="_blank" style="color: ${textPrimary}; text-decoration: none;">${d.portfolio.replace(/^https?:\/\//, "")}</a>` : ""}
              </div>

              ${d.skills ? `
              <div style="font-size: 11px; color: ${textSecondary}; padding-top: 10px;">
                <span style="color: ${isDark ? "#f59e0b" : "#b45309"}; font-weight: bold;">$ config --skills</span> 
                <div style="background-color: ${isDark ? "#022c22" : "#f1f5f9"}; padding: 4px; border: 1px solid ${borderTheme}; border-radius: 4px; margin-top: 4px; color: ${textPrimary};">
                  ${d.skills}
                </div>
              </div>` : ""}
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "neumorphism",
    name: "Tactile Neumorphism",
    description: "Sleek soft-shadow extrusion (outset look) suited for product designers.",
    category: "Card",
    renderPlainText: (d) => `${d.name} | ${d.title}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#1e293b" : "#e2e8f0"; // slate-800 or slate-200
      const textPrimary = isDark ? "#ffffff" : "#1e293b";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accent = isDark ? "#818cf8" : "#4f46e5";
      
      // Neumorphic shadow styling helpers (inset/outset gradients)
      const shadowStyle = isDark 
        ? "background: #1e293b; box-shadow: 6px 6px 12px #0f172a, -6px -6px 12px #2e3e56;"
        : "background: #e2e8f0; box-shadow: 6px 6px 12px #bdc5d0, -6px -6px 12px #ffffff;";
      
      const subShadowStyle = isDark
        ? "background: #1e293b; border: 1px solid #334155;"
        : "background: #e2e8f0; border: 1px solid #d1d5db;";

      const avatarUrl = safeStr(d.profilePicture, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150");

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="${shadowStyle} font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 480px; width: 100%; border-radius: 16px; padding: 22px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="middle">
                  <!-- Avatar cell -->
                  <td width="80" style="width: 80px; padding-right: 16px;">
                    <img src="${avatarUrl}" width="65" height="65" alt="${d.name}" style="border-radius: 50%; object-fit: cover; border: 2px solid ${isDark ? "#334155" : "#cbd5e1"};" referrerPolicy="no-referrer" />
                  </td>
                  <td>
                    <span style="font-size: 17px; font-weight: 800; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="font-size: 12px; font-weight: bold; color: ${accent};">${safeStr(d.title, "Lead Full Stack Engineer")}</span>
                    <br>
                    <span style="font-size: 11px; color: ${textSecondary}; font-weight: 500;">at ${safeStr(d.company, "StackForge")}</span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <!-- Outer pill representation of dynamic info values -->
                        <td style="${subShadowStyle} padding: 10px; border-radius: 8px; font-size: 11px; line-height: 1.5; color: ${textSecondary};">
                          📱 <b style="color: ${textPrimary};">Phone:</b> ${safeStr(d.phone, "+1 (555) 019-2834")} 
                          <span style="margin:0 4px; opacity:0.5;">|</span> 
                          📧 <b style="color: ${textPrimary};">Email:</b> <a href="mailto:${d.email}" style="color: ${accent}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                          ${d.portfolio ? `<br>🌐 <b style="color: ${textPrimary};">Web:</b> <a href="${d.portfolio}" target="_blank" style="color: ${accent}; text-decoration: none;">${d.portfolio.replace(/^https?:\/\//, "")}</a>` : ""}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Bottom controls styled as neumorphic labels -->
                <tr>
                  <td colspan="2" style="padding-top: 10px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 8px;"><a href="https://github.com/${d.github}" target="_blank" style="${subShadowStyle} border-radius: 6px; padding: 4px 8px; font-size: 11px; text-decoration: none; color: ${textPrimary}; font-weight: bold;">Github</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-right: 8px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="${subShadowStyle} border-radius: 6px; padding: 4px 8px; font-size: 11px; text-decoration: none; color: ${accent}; font-weight: bold;">LinkedIn</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "card-pill",
    name: "Classic Frame Card",
    description: "Rounded clean bounds, emphasizing structured alignment and soft padding.",
    category: "Card",
    renderPlainText: (d) => `${d.name} inside Signature Card`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#111827" : "#ffffff";
      const textPrimary = isDark ? "#f3f4f6" : "#1f2937";
      const textSecondary = isDark ? "#9ca3af" : "#4b5563";
      const accent = isDark ? "#60a5fa" : "#2563eb";
      const borderTheme = isDark ? "#374151" : "#e5e7eb";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 480px; width: 100%; border-radius: 12px; border: 2px solid ${borderTheme}; padding: 16px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accent}; letter-spacing: 0.1em; display: inline-block; margin-bottom: 4px;">Verified Dev Profile</span>
                    <br>
                    <span style="font-size: 18px; font-weight: 700; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="font-size: 12px; color: ${textSecondary};">${safeStr(d.title, "Lead Full Stack Engineer")} @ <b>${safeStr(d.company, "StackForge")}</b></span>
                  </td>
                </tr>
                <tr>
                  <td height="8" style="border-bottom: 1px solid ${borderTheme};"></td>
                </tr>
                <tr>
                  <td height="10"></td>
                </tr>
                <tr>
                  <td style="line-height: 1.6; color: ${textSecondary};">
                    📞 ${safeStr(d.phone, "+1 (555) 019-2834")}<br>
                    📧 <a href="mailto:${d.email}" style="color: ${accent}; text-decoration: none; font-weight: 500;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 8px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: bold; border-bottom: 2px solid ${accent}; font-size: 11px;">GitHub ↗</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-right: 8px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: bold; border-bottom: 2px solid ${accent}; font-size: 11px;">LinkedIn ↗</a></td>` : ""}
                        ${d.portfolio ? `<td><a href="${d.portfolio}" target="_blank" style="color: ${accent}; text-decoration: none; font-weight: bold; border-bottom: 2px solid ${accent}; font-size: 11px;">Portfolio ↗</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "social-emphasis",
    name: "Social Emphasis Row",
    description: "Emphasis placed on your professional handles first for network boosters.",
    category: "Creative",
    renderPlainText: (d) => `Connect with ${d.name} on LinkedIn/GitHub`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0f172a" : "#f1f5f9";
      const textPrimary = isDark ? "#f8fafc" : "#0f172a";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accent = isDark ? "#ec4899" : "#db2777"; // beautiful pink theme
      const cardBg = isDark ? "#1e293b" : "#ffffff";
      const borderTheme = isDark ? "#334155" : "#e2e8f0";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 12px; padding: 20px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-weight: 800; font-size: 18px; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="font-size: 12px; color: ${accent}; font-weight: bold; text-transform: uppercase;">${safeStr(d.title, "Lead Full Stack Engineer")}</span>
                  </td>
                </tr>
                <tr>
                  <td height="10"></td>
                </tr>
                <!-- Social banner rows inside split-cards -->
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        ${d.github ? `<td style="padding-right: 8px;"><a href="https://github.com/${d.github}" target="_blank" style="background-color: ${cardBg}; color: ${textPrimary}; border: 1px solid ${borderTheme}; border-radius: 6px; padding: 6px 12px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 11px;">🐙 GitHub Profile &rarr;</a></td>` : ""}
                        ${d.linkedin ? `<td><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="background-color: ${cardBg}; color: ${accent}; border: 1px solid ${borderTheme}; border-radius: 6px; padding: 6px 12px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 11px;">💼 LinkedIn Connect &rarr;</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="font-size: 11px; line-height: 1.4; color: ${textSecondary};">
                    📧 <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a> <span style="margin: 0 4px;">|</span>
                    📱 ${safeStr(d.phone, "+1 (555) 019-2834")} <span style="margin: 0 4px;">|</span>
                    ${d.portfolio ? `📂 <a href="${d.portfolio}" target="_blank" style="color: ${textPrimary}; text-decoration: none;">${d.portfolio.replace(/^https?:\/\//, "")}</a>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "floating-glow",
    name: "Cyber Floating Glow",
    description: "Features a soft color halo suited for web developers and modern builders.",
    category: "Creative",
    renderPlainText: (d) => `${d.name} [Cyber Glow Mode]`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#080710" : "#ffffff";
      const textPrimary = isDark ? "#ffffff" : "#1f2937";
      const textSecondary = isDark ? "#9ca3af" : "#4b5563";
      const accent = isDark ? "#a855f7" : "#7c3aed"; // Violet
      // Faux container glow styles
      const shadowBox = isDark 
        ? "background: #0d0b1a; border: 1px solid rgba(168, 85, 247, 0.4); box-shadow: 0 4px 20px rgba(168, 85, 247, 0.15);"
        : "background: #ffffff; border: 1px solid rgba(124, 58, 237, 0.2); box-shadow: 0 10px 25px rgba(124, 58, 237, 0.08);";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="${shadowBox} font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 480px; width: 100%; border-radius: 12px; padding: 22px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 19px; font-weight: 800; color: ${textPrimary}; letter-spacing: -0.02em;">
                      ${safeStr(d.name, "Sarah Chen")}
                    </span>
                    <br>
                    <span style="font-size: 13px; font-weight: bold; color: ${accent}; padding-top: 2px;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")}
                    </span>
                    <span style="color: ${textSecondary};"> @ ${safeStr(d.company, "StackForge")}</span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; line-height: 1.6; color: ${textSecondary};">
                    ⚡ <strong>Main:</strong> <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                    ${d.phone ? `<br>📞 <strong>Phone:</strong> ${d.phone}` : ""}
                  </td>
                </tr>
                <!-- Glowing underline and footer -->
                <tr>
                  <td style="padding-top: 14px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 12px;"><a href="https://github.com/${d.github}" target="_blank" style="background: ${isDark ? "#2e1065" : "#f3e8ff"}; border-radius: 20px; padding: 4px 12px; font-size: 11px; text-decoration: none; color: ${accent}; font-weight: bold; display: inline-block;">github.com/${d.github}</a></td>` : ""}
                        ${d.linkedin ? `<td><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="background: ${accent}; border-radius: 20px; padding: 4px 12px; font-size: 11px; text-decoration: none; color: #ffffff; font-weight: bold; display: inline-block;">LinkedIn Connect</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "boxed-border",
    name: "Border Boxed Solid",
    description: "Industrial grid design with bordered compartments.",
    category: "Minimalist",
    renderPlainText: (d) => `Signature of ${d.name}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#111827" : "#ffffff";
      const textPrimary = isDark ? "#ffffff" : "#111827";
      const textSecondary = isDark ? "#9ca3af" : "#4b5563";
      const accent = isDark ? "#f43f5e" : "#e11d48"; // Rose focus
      const borderTheme = isDark ? "#374151" : "#e5e7eb";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width:100%; border: 3px solid ${textPrimary}; padding: 16px;">
          <tr>
            <td style="border: 1px dashed ${borderTheme}; padding: 14px;">
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 18px; font-weight: 800; color: ${textPrimary}; text-transform: uppercase; letter-spacing: -0.01em;">
                      ${safeStr(d.name, "Sarah Chen")}
                    </span>
                    <br>
                    <span style="font-size: 12px; color: ${accent}; font-weight: bold; text-transform: uppercase;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")}
                    </span>
                    <span style="color: ${textSecondary};"> // ${safeStr(d.company, "StackForge")}</span>
                  </td>
                </tr>
                <tr>
                  <td height="10"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; line-height: 1.6; color: ${textSecondary};">
                    <b>E:</b> <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                    ${d.phone ? `<br><b>P:</b> ${d.phone}` : ""}
                    ${d.portfolio ? `<br><b>W:</b> <a href="${d.portfolio}" target="_blank" style="color: ${accent}; text-decoration: underline;">${d.portfolio}</a>` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 14px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: bold; font-size: 11px;">[GITHUB]</a></td>` : ""}
                        ${d.linkedin ? `<td><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: bold; font-size: 11px;">[LINKEDIN]</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "magazine",
    name: "Magazine Serif Editorial",
    description: "Classic styling using a high-contrast elegant serif font and fine rules.",
    category: "Creative",
    renderPlainText: (d) => `Mr/Ms ${d.name} - ${d.title}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0f172a" : "#fbf9f6"; // beautiful cream white in light mode
      const textPrimary = isDark ? "#ffffff" : "#111827";
      const textSecondary = isDark ? "#94a3b8" : "#57534e"; // warm gray / stone
      const accent = isDark ? "#6366f1" : "#7c3aed";
      const borderTheme = isDark ? "#334155" : "#d6d3d1";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: Georgia, Garamond, serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 4px; border: 1px solid ${borderTheme}; padding: 22px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <!-- Classy Serif Header -->
                    <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 21px; font-weight: 500; font-style: italic; color: ${textPrimary}; letter-spacing: -0.01em;">
                      ${safeStr(d.name, "Sarah Chen")}
                    </span>
                    <br>
                    <span style="font-family: sans-serif; font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accent}; letter-spacing: 0.1em; padding-top: 4px; display: inline-block;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")}
                    </span>
                    <span style="font-family: sans-serif; font-size: 11px; color: ${textSecondary};">
                      &mdash; ${safeStr(d.company, "StackForge")}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <!-- Thin divider decoration -->
                <tr>
                  <td height="1" style="background-color: ${borderTheme}; font-size: 1px; line-height: 1px;"></td>
                </tr>
                <tr>
                  <td height="10"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; line-height: 1.6; color: ${textSecondary}; font-style: italic;">
                    E: <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none; font-style: normal; font-weight: 600;">${safeStr(d.email, "sarah@stackforge.dev")}</a> <br>
                    P: <span style="font-style: normal; font-weight: 500; color: ${textPrimary}">${safeStr(d.phone, "+1 (555) 019-2834")}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 14px;"><a href="https://github.com/${d.github}" target="_blank" style="font-family: sans-serif; text-transform: uppercase; font-size: 10px; font-weight: bold; color: ${textPrimary}; text-decoration: none; letter-spacing: 0.05em;">GitHub &rarr;</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-right: 14px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="font-family: sans-serif; text-transform: uppercase; font-size: 10px; font-weight: bold; color: ${textPrimary}; text-decoration: none; letter-spacing: 0.05em;">LinkedIn &rarr;</a></td>` : ""}
                        ${d.portfolio ? `<td><a href="${d.portfolio}" target="_blank" style="font-family: sans-serif; text-transform: uppercase; font-size: 10px; font-weight: bold; color: ${accent}; text-decoration: none; letter-spacing: 0.05em;">Portfolio &rarr;</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "minimal-icons",
    name: "Minimalist Icons Only",
    description: "Compact stacked row, perfect for minimal developers wanting tiny footers.",
    category: "Minimalist",
    renderPlainText: (d) => `${d.name} (${d.title}) - ${d.email}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0f172a" : "#ffffff";
      const textPrimary = isDark ? "#f1f5f9" : "#1e293b";
      const textSecondary = isDark ? "#94a3b8" : "#64748b";
      const accent = isDark ? "#10b981" : "#059669";
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 480px; width: 100%; border-radius: 8px; border: 1px solid ${borderTheme}; padding: 12px 16px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="middle">
                  <td>
                    <span style="font-weight: bold; font-size: 15px; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <span style="color: ${textSecondary}; font-size: 11px; margin: 0 6px;">|</span>
                    <span style="color: ${textSecondary}; font-size: 12px;">${safeStr(d.title, "Lead Full Stack Engineer")}</span>
                  </td>
                  <td align="right" style="text-align: right;">
                    <table cellpadding="0" cellspacing="0" border="0" style="display: inline-block;">
                      <tr>
                        <td style="padding-left: 10px;"><a href="mailto:${d.email}" title="Email" style="text-decoration: none; font-size: 14px;">📧</a></td>
                        ${d.phone ? `<td style="padding-left: 10px;"><a href="tel:${d.phone}" title="Phone" style="text-decoration: none; font-size: 14px;">📱</a></td>` : ""}
                        ${d.github ? `<td style="padding-left: 10px;"><a href="https://github.com/${d.github}" target="_blank" title="GitHub" style="text-decoration: none; font-size: 14px;">🐙</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-left: 10px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" title="LinkedIn" style="text-decoration: none; font-size: 14px;">💼</a></td>` : ""}
                        ${d.portfolio ? `<td style="padding-left: 10px;"><a href="${d.portfolio}" target="_blank" title="Portfolio" style="text-decoration: none; font-size: 14px;">🌐</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "vertical-cta",
    name: "Interactive CTA Stack",
    description: "Features a colored custom interactive booking banner or custom text button.",
    category: "Creative",
    renderPlainText: (d) => `${d.name} (Schedule a meeting!)`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0b0f19" : "#ffffff";
      const textPrimary = isDark ? "#ffffff" : "#1e293b";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accent = isDark ? "#10b981" : "#0d9488"; // emerald / teal
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 12px; border: 1px solid ${borderTheme}; padding: 18px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 18px; font-weight: bold; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="font-size: 12px; color: ${textSecondary}; font-weight: 500;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")} @ <b style="color: ${accent};">${safeStr(d.company, "StackForge")}</b>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: ${textSecondary};">
                    📞 ${safeStr(d.phone, "+1 (555) 019-2834")} <span style="margin: 0 4px; color: ${borderTheme};">|</span> 
                    📧 <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                  </td>
                </tr>
                <tr>
                  <td height="14"></td>
                </tr>
                <!-- Prominent capsule CTA button -->
                <tr>
                  <td>
                    <a href="${safeStr(d.portfolio, "https://github.com")}" target="_blank" style="background-color: ${accent}; color: #ffffff; border-radius: 6px; padding: 8px 16px; font-size: 12px; font-weight: bold; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      📅 BOOK A 1-ON-1 TECH CALL &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "profile-left",
    name: "Profile-Left Columns",
    description: "40/60 design split, with avatar highlighting left and text channels grouped right.",
    category: "Professional",
    renderPlainText: (d) => `${d.name} | ${d.title}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0f172a" : "#f8fafc";
      const sidebarBg = isDark ? "#1e293b" : "#edf2f7";
      const textPrimary = isDark ? "#ffffff" : "#1a202c";
      const textSecondary = isDark ? "#94a3b8" : "#4a5568";
      const accent = isDark ? "#3b82f6" : "#2b6cb0";
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";
      const avatarUrl = safeStr(d.profilePicture, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150");

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 520px; width: 100%; border-radius: 10px; border: 1px solid ${borderTheme};">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="top">
                  <!-- Sidebar with Photo + Name -->
                  <td width="160" style="width: 160px; background-color: ${sidebarBg}; padding: 18px; border-top-left-radius: 9px; border-bottom-left-radius: 9px; text-align: center;">
                    <img src="${avatarUrl}" width="65" height="65" alt="${d.name}" style="border-radius: 50%; object-fit: cover; border: 2px solid #ffffff; display: block; margin: 0 auto 8px auto;" referrerPolicy="no-referrer" />
                    <span style="font-size: 14px; font-weight: bold; color: ${textPrimary}; display: block; line-height: 1.2;">
                      ${safeStr(d.name, "Sarah Chen")}
                    </span>
                    <span style="font-size: 11px; color: ${textSecondary}; display: block; padding-top: 2px; font-weight: 500;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")}
                    </span>
                  </td>
                  <!-- Contacts list sidebar split container -->
                  <td style="padding: 18px 18px 18px 24px;">
                    <div style="font-size: 10px; font-weight: bold; color: ${textSecondary}; text-transform: uppercase; margin-bottom: 8px;">Contact Address</div>
                    <div style="font-size: 13px; color: ${textPrimary}; font-weight: bold; margin-bottom: 2px;">🏢 ${safeStr(d.company, "StackForge")}</div>
                    <div style="color: ${textSecondary}; line-height: 1.6; font-size: 12px; margin-bottom: 10px;">
                      📧 <a href="mailto:${d.email}" style="color: ${accent}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a><br>
                      📞 ${safeStr(d.phone, "+1 (555) 019-2834")}
                    </div>
                    <!-- Social icons nested grid style -->
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 12px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textSecondary}; text-decoration: none; font-weight: bold; font-size: 11px;">GitHub ↗</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-right: 12px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${accent}; text-decoration: none; font-weight: bold; font-size: 11px;">LinkedIn ↗</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "badge-collector",
    name: "Pill Badge Collector",
    description: "Compact buttons showing off links as solid rounded identity pills.",
    category: "Tech",
    renderPlainText: (d) => `${d.name} pills`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0b0f19" : "#ffffff";
      const textPrimary = isDark ? "#f3f4f6" : "#1f2937";
      const textSecondary = isDark ? "#9ca3af" : "#4b5563";
      const accent = isDark ? "#ec4899" : "#be185d"; // Fuchsia focus
      const borderTheme = isDark ? "#1e293b" : "#e5e7eb";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 12px; border: 1px solid ${borderTheme}; padding: 18px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 18px; font-weight: 800; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="font-size: 11px; color: ${textSecondary}; text-transform: uppercase; font-weight: bold; tracking: 0.1em;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")} &bull; ${safeStr(d.company, "StackForge")}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td height="8" style="border-bottom: 1px solid ${borderTheme};"></td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: ${textSecondary};">
                    📧 <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none; font-weight: bold;">${safeStr(d.email, "sarah@stackforge.dev")}</a> <span style="margin: 0 4px;">&bull;</span> 📱 ${safeStr(d.phone, "+1 (555) 019-2834")}
                  </td>
                </tr>
                <!-- Round solid pill badges for active developer socials -->
                <tr>
                  <td style="padding-top: 12px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 6px;"><a href="https://github.com/${d.github}" target="_blank" style="background-color: ${isDark ? "#1e293b" : "#f1f5f9"}; border: 1px solid ${borderTheme}; color: ${textPrimary}; border-radius: 99px; padding: 4px 12px; font-size: 10px; text-decoration: none; font-weight: bold; display: inline-block;">🐙 @${d.github}</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-right: 6px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="background-color: ${isDark ? "#115e59" : "#ccfbf1"}; color: ${isDark ? "#2dd4bf" : "#0f766e"}; border-radius: 99px; padding: 4px 12px; font-size: 10px; text-decoration: none; font-weight: bold; display: inline-block;">💼 LinkedIn</a></td>` : ""}
                        ${d.portfolio ? `<td><a href="${d.portfolio}" target="_blank" style="background-color: ${accent}; color: #ffffff; border-radius: 99px; padding: 4px 12px; font-size: 10px; text-decoration: none; font-weight: bold; display: inline-block;">🌐 Portfolio</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "underline-wave",
    name: "Modern Gradient Underline",
    description: "Design highlighting name backed by a thick colored anchor border.",
    category: "Creative",
    renderPlainText: (d) => `${d.name} (${d.title})`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#090d16" : "#ffffff";
      const textPrimary = isDark ? "#ffffff" : "#111827";
      const textSecondary = isDark ? "#94a3b8" : "#4b5563";
      const headingGlow = isDark ? "linear-gradient(90deg, #3b82f6, #8b5cf6)" : "linear-gradient(90deg, #2563eb, #7c3aed)";
      const borderTheme = isDark ? "#1e293b" : "#e5e7eb";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 480px; width: 100%; border-radius: 8px; border: 1px solid ${borderTheme}; padding: 20px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; color: ${textPrimary}; spacing: -0.01em;">
                      ${safeStr(d.name, "Sarah Chen")}
                    </span>
                    <!-- Thick accent line -->
                    <div style="height: 4px; background: ${headingGlow}; margin-top: 4px; margin-bottom: 4px; width: 80px; border-radius: 2px;"></div>
                    <span style="font-size: 12px; color: ${textSecondary}; font-weight: bold;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")} &bull; ${safeStr(d.company, "StackForge")}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="color: ${textSecondary}; line-height: 1.5; font-size:12px;">
                    📱 Phone: <b style="color: ${textPrimary}">${safeStr(d.phone, "+1 (555) 019-2834")}</b><br>
                    📧 Email: <b style="color: ${textPrimary}"><a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a></b>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 14px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textSecondary}; text-decoration: none; font-weight: bold; font-family: monospace;">$ github/${d.github}</a></td>` : ""}
                        ${d.linkedin ? `<td><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textSecondary}; text-decoration: none; font-weight: bold; font-family: monospace;">$ linkedin/${d.linkedin}</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "cyberpunk-red",
    name: "Cyberpunk Red Action",
    description: "Futuristic layout with digital hacking prompts and red neon accents.",
    category: "Tech",
    renderPlainText: (d) => `ACCESS: ${d.name} // SYSTEM ON`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#090505" : "#fffbfc";
      const textPrimary = isDark ? "#ffffff" : "#2d1616";
      const textSecondary = isDark ? "#fca5a5" : "#991b1b"; // deep red in light, light rose in dark
      const accent = "#ef4444"; // pure neon red
      const borderTheme = isDark ? "#450a0a" : "#fecaca";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'JetBrains Mono', Courier, monospace; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border: 2px solid ${accent}; padding: 18px; position: relative;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <!-- Telemetry subtitle -->
                <tr>
                  <td style="font-size: 10px; color: ${accent}; font-weight: bold; word-spacing: 0.1em; padding-bottom: 4px;">
                    // SECURITY SYSTEM: AUTHORIZED_ENCRYPTED_ACCESS
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="font-size: 19px; font-weight: 900; text-transform: uppercase; color: ${textPrimary}; tracking: -0.03em;">
                      ${safeStr(d.name, "Sarah Chen")}
                    </span>
                    <br>
                    <span style="font-size: 12px; background-color: ${accent}; color: #ffffff; padding: 1px 6px; font-weight: bold; display: inline-block; margin-top: 2px;">
                      ${safeStr(d.title, "Lead Full Stack Engineer").toUpperCase()}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: ${textSecondary}; line-height: 1.6; border-left: 3px solid ${accent}; padding-left: 10px;">
                    <b>SYS_EMAIL:</b> <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none; font-weight: bold;">${safeStr(d.email, "sarah@stackforge.dev")}</a> <br>
                    <b>SYS_PHONE:</b> ${safeStr(d.phone, "+1 (555) 019-2834")} <br>
                    ${d.portfolio ? `<b>SYS_PORTFOLIO:</b> <a href="${d.portfolio}" target="_blank" style="color: ${accent}; text-decoration: none;">${d.portfolio.replace(/^https?:\/\//, "")}</a>` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px; font-size: 11px;">
                    ${d.github ? `<a href="https://github.com/${d.github}" target="_blank" style="color: ${textPrimary}; text-decoration: underline; font-weight: bold; margin-right: 14px;">[GIT://@${d.github}]</a>` : ""}
                    ${d.linkedin ? `<a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${accent}; text-decoration: none; font-weight: bold;">[LINKEDIN://CONNECT]</a>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "academic-cv",
    name: "Clean Academic/CV",
    description: "Deep structured corporate layout focusing on clean vertical lines.",
    category: "Professional",
    renderPlainText: (d) => `${d.name} CV style`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0f172a" : "#ffffff";
      const textPrimary = isDark ? "#f1f5f9" : "#1e3a8a"; // beautiful classic Navy in light mode
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accent = isDark ? "#f59e0b" : "#b45309"; // Amber/gold contrast
      const borderTheme = isDark ? "#334155" : "#cbd5e1";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'Times New Roman', Times, serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-top: 4px solid ${textPrimary}; border-bottom: 2px solid ${textPrimary}; padding: 18px 6px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 21px; font-weight: bold; text-transform: uppercase; color: ${textPrimary}; letter-spacing: 0.05em;">
                      ${safeStr(d.name, "Sarah Chen")}
                    </span>
                    <br>
                    <span style="font-family: sans-serif; font-size: 12px; font-weight: bold; color: ${accent}; text-transform: uppercase;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")}
                    </span>
                    <span style="font-family: sans-serif; font-size: 11px; color: ${textSecondary};"> &mdash; ${safeStr(d.company, "StackForge")}</span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="font-family: sans-serif; font-size: 12px; line-height: 1.6; color: ${textSecondary};">
                    <b>Address Email:</b> <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a> <span style="margin: 0 4px; color: ${borderTheme};">|</span>
                    <b>Contact No:</b> ${safeStr(d.phone, "+1 (555) 019-2834")} <br>
                    ${d.portfolio ? `<b>Reference Web:</b> <a href="${d.portfolio}" target="_blank" style="color: ${textPrimary};">${d.portfolio}</a>` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="font-family: sans-serif; font-size: 11px;">
                      <tr>
                        ${d.github ? `<td style="padding-right: 14px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textSecondary}; text-decoration: underline;">GitHub</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-right: 14px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textSecondary}; text-decoration: underline;">LinkedIn</a></td>` : ""}
                        ${d.twitter ? `<td><a href="https://twitter.com/${d.twitter}" target="_blank" style="color: ${textSecondary}; text-decoration: underline;">Twitter/X</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "minimal-compact",
    name: "Ultra Compact Bar",
    description: "Extremely short single-row format with small inline badge connectors.",
    category: "Minimalist",
    renderPlainText: (d) => `${d.name} - ${d.title}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0f172a" : "#f8fafc";
      const textPrimary = isDark ? "#ffffff" : "#0f172a";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accent = isDark ? "#38bdf8" : "#0284c7";
      const borderTheme = isDark ? "#334155" : "#e2e8f0";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 12px; max-width: 520px; width: 100%; border-radius: 6px; padding: 10px 14px; border: 1px solid ${borderTheme};">
          <tr>
            <td>
              <span style="font-weight: bold; color: ${textPrimary}; font-size:14px;">${safeStr(d.name, "Sarah Chen")}</span>
              <span style="color: ${accent}; font-weight: 500;"> (${safeStr(d.title, "Lead Full Stack Engineer")})</span>
              <span style="color: ${textSecondary};"> at ${safeStr(d.company, "StackForge")}</span>
              <div style="height: 1px; background-color: ${borderTheme}; margin: 6px 0;"></div>
              <span style="color: ${textSecondary};">
                📞 ${safeStr(d.phone, "+1 (555) 019-2834")} &bull; 
                📧 <a href="mailto:${d.email}" style="color: ${accent}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a> &bull;
                ${d.github ? `<a href="https://github.com/${d.github}" style="color: ${textSecondary}; text-decoration: none; font-weight:bold;"> GitHub</a>` : ""}
              </span>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "brutalist-mono",
    name: "Brutalist Monochrome",
    description: "High impact raw typography layout with solid chunky black borders.",
    category: "Minimalist",
    renderPlainText: (d) => `${d.name} brutality`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#000000" : "#ffffff";
      const textPrimary = isDark ? "#ffffff" : "#000000";
      const textSecondary = isDark ? "#a3a3a3" : "#525252";
      const lineBorder = isDark ? "3px solid #ffffff" : "3px solid #000000";
      const accent = isDark ? "#38bdf8" : "#2563eb";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'JetBrains Mono', Courier, monospace; color: ${textPrimary}; font-size: 13px; max-width: 480px; width: 100%; border: ${lineBorder}; padding: 14px;">
          <tr>
            <td>
              <div style="font-size: 20px; font-weight: 900; text-transform: uppercase; border-bottom: ${lineBorder}; padding-bottom: 4px; color: ${textPrimary};">
                ${safeStr(d.name, "Sarah Chen")}
              </div>
              <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; padding-top: 6px; color: ${textPrimary};">
                ${safeStr(d.title, "Lead Full Stack Engineer")} / ${safeStr(d.company, "StackForge")}
              </div>
              <div style="height: 10px;"></div>
              <div style="font-size: 12px; line-height: 1.5; color: ${textSecondary};">
                &raquo; EMAIL: <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: underline; font-weight:bold;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                ${d.phone ? `<br>&raquo; TEL: <span style="color: ${textPrimary}; font-weight:bold;">${d.phone}</span>` : ""}
                ${d.portfolio ? `<br>&raquo; portfolio: <a href="${d.portfolio}" style="color: ${textPrimary};">${d.portfolio}</a>` : ""}
              </div>
              <div style="height: 10px;"></div>
              <div>
                ${d.github ? `<a href="https://github.com/${d.github}" target="_blank" style="background-color: ${textPrimary}; color: ${bg}; padding: 2px 6px; font-size: 11px; text-decoration: none; font-weight: bold; text-transform: uppercase;">github</a> &nbsp;` : ""}
                ${d.linkedin ? `<a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="background-color: ${textPrimary}; color: ${bg}; padding: 2px 6px; font-size: 11px; text-decoration: none; font-weight: bold; text-transform: uppercase;">linkedin</a>` : ""}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "modern-creative",
    name: "Modern Creative Prism",
    description: "Diagonal accents, dual colored badges, asymmetrical modern tech layouts.",
    category: "Creative",
    renderPlainText: (d) => `${d.name} creative style`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#080e1a" : "#fffbeb"; // warm amber accent in light, dark void in dark
      const textPrimary = isDark ? "#f8fafc" : "#1e293b";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accent = isDark ? "#ec4899" : "#db2777";
      const borderTheme = isDark ? "#1e293b" : "#fde68a";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width:100%; border-radius: 12px; border: 2px solid ${borderTheme}; padding: 20px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 11px; background-color: rgba(236,72,153,0.15); color: ${accent}; padding: 2px 8px; border-radius: 4px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-bottom: 6px;">🌈 Digital Architect</span>
                    <br>
                    <span style="font-size: 20px; font-weight: 800; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="font-size: 12px; color: ${textSecondary};">${safeStr(d.title, "Lead Full Stack Engineer")} &bull; <b>${safeStr(d.company, "StackForge")}</b></span>
                  </td>
                </tr>
                <tr>
                  <td height="12"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: ${textSecondary};">
                    📞 <span style="color: ${textPrimary}; font-weight: 500;">${safeStr(d.phone, "+1 (555) 019-2834")}</span> <span style="margin: 0 4px;">|</span>
                    📧 <a href="mailto:${d.email}" style="color: ${accent}; text-decoration: none; font-weight: bold;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${d.github ? `<td style="padding-right: 12px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: bold; border-left: 3px solid ${accent}; padding-left: 6px; font-size:11px;">GitHub</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-right: 12px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: bold; border-left: 3px solid ${accent}; padding-left: 6px; font-size:11px;">LinkedIn</a></td>` : ""}
                        ${d.portfolio ? `<td><a href="${d.portfolio}" target="_blank" style="color: ${accent}; text-decoration: none; font-weight: bold; border-left: 3px solid ${textPrimary}; padding-left: 6px; font-size:11px;">Portfolio</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "elegant-indigo",
    name: "Elegant Corporate Indigo",
    description: "Highly polished, minimal indigo-centered identity line for modern teams.",
    category: "Professional",
    renderPlainText: (d) => `${d.name} (Indigo Corporate)`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#090d16" : "#ffffff";
      const textPrimary = isDark ? "#f8fafc" : "#1e1b4b"; // deep indigo
      const textSecondary = isDark ? "#94a3b8" : "#4f46e5"; // indigo-600
      const contentText = isDark ? "#cbd5e1" : "#4338ca";
      const accent = isDark ? "#818cf8" : "#4f46e5";
      const borderTheme = isDark ? "#1e293b" : "#e0e7ff";

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: -apple-system, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 8px; border: 1px solid ${borderTheme}; padding: 18px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="font-size: 19px; font-weight: 700; color: ${textPrimary};">${safeStr(d.name, "Sarah Chen")}</span>
                    <br>
                    <span style="font-size: 12px; color: ${accent}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                      ${safeStr(d.title, "Lead Full Stack Engineer")}
                    </span>
                    <span style="color: ${contentText}; font-size: 12px;"> / ${safeStr(d.company, "StackForge")}</span>
                  </td>
                </tr>
                <tr>
                  <td height="8" style="border-bottom: 2px solid ${borderTheme};"></td>
                </tr>
                <tr>
                  <td height="10"></td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: ${contentText}; line-height: 1.6;">
                    📱 Office: <b>${safeStr(d.phone, "+1 (555) 019-2834")}</b> &bull; 
                    📧 Direct: <b><a href="mailto:${d.email}" style="color: ${accent}; text-decoration: underline;">${safeStr(d.email, "sarah@stackforge.dev")}</a></b>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 8px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="font-size: 11px;">
                      <tr>
                        ${d.github ? `<td style="padding-right: 14px;"><a href="https://github.com/${d.github}" target="_blank" style="color: ${accent}; font-weight: bold; text-decoration: none;">GitHub</a></td>` : ""}
                        ${d.linkedin ? `<td style="padding-right: 14px;"><a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${accent}; font-weight: bold; text-decoration: none;">LinkedIn</a></td>` : ""}
                        ${d.portfolio ? `<td><a href="${d.portfolio}" target="_blank" style="color: ${textPrimary}; font-weight: bold; text-decoration: none;">Portfolio ↗</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "git-commit-avatar",
    name: "[Git] Commit-History Card",
    description: "Programmer Git branch layout with an elegant circular avatar, green status markers, and monospace code stats.",
    category: "Tech",
    renderPlainText: (d) => `commit ${d.github || "hacker"}\nAuthor: ${d.name} <${d.email}>\nDate: Just Now\n\n\t[Feature] ${d.title} @ ${d.company}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#090d16" : "#ffffff";
      const textPrimary = isDark ? "#34d399" : "#1f2937"; // beautiful emerald terminal green vs dark charcoal
      const textSecondary = isDark ? "#e2e8f0" : "#4b5563";
      const accent = "#22c55e"; // Git Green
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";
      const avatarUrl = safeStr(d.profilePicture, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150");
      const skills = parseSkills(d.skills);

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'JetBrains Mono', 'Fira Code', monospace, sans-serif; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 8px; border: 1px dashed ${isDark ? "#22c55e" : "#0d9488"}; padding: 18px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="top">
                  <!-- Git commit timeline visual element -->
                  <td width="30" style="width: 30px; text-align: center;">
                    <font style="font-size: 14px; color: ${accent}; font-weight: bold;">&bull;</font>
                    <div style="width: 2px; height: 50px; background-color: ${borderTheme}; margin: 5px auto;"></div>
                    <font style="font-size: 14px; color: ${isDark ? "#38bdf8" : "#2563eb"}; font-weight: bold;">&bull;</font>
                  </td>
                  
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <td style="font-size: 11px; color: ${isDark ? "#64748b" : "#94a3b8"}; font-weight: bold; text-transform: uppercase;">
                          $ git log -n 1 --oneline
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; color: ${accent}; font-weight: bold; padding-top: 4px;">
                          commit ef54d92 (${isDark ? "origin/main" : "HEAD -> main"})
                        </td>
                      </tr>
                      
                      <!-- Author details with Avatar -->
                      <tr>
                        <td style="padding-top: 10px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr valign="middle">
                              <td style="padding-right: 12px;">
                                <img src="${avatarUrl}" width="50" height="50" alt="${d.name}" style="border-radius: 50%; object-fit: cover; border: 2px solid ${accent}; display: block;" referrerPolicy="no-referrer" />
                              </td>
                              <td>
                                <span style="font-size: 16px; font-weight: 800; color: ${isDark ? "#ffffff" : "#111827"}; display: block; line-height: 1.2;">
                                  ${safeStr(d.name, "Sarah Chen")}
                                </span>
                                <span style="font-size: 11px; color: ${textSecondary}; display: block; padding-top: 2px;">
                                  ${safeStr(d.title, "Lead Full Stack Engineer")} @ <b>${safeStr(d.company, "StackForge")}</b>
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td height="12"></td>
                      </tr>
                      
                      <!-- Contact channels & social stats -->
                      <tr>
                        <td style="font-size: 11px; color: ${textSecondary}; line-height: 1.6; border-top: 1px solid ${borderTheme}; padding-top: 10px;">
                          <span style="color: ${accent}; font-weight: bold;">[Email]</span> <a href="mailto:${d.email}" style="color: ${isDark ? "#f8fafc" : "#111827"}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                          ${d.phone ? `<br><span style="color: ${accent}; font-weight: bold;">[Phone]</span> <span style="color: ${isDark ? "#f8fafc" : "#111827"};">${d.phone}</span>` : ""}
                          ${d.website ? `<br><span style="color: ${accent}; font-weight: bold;">[Web  ]</span> <a href="${d.website}" target="_blank" style="color: ${isDark ? "#38bdf8" : "#2563eb"}; text-decoration: none;">${d.website.replace(/^https?:\/\//, "")}</a>` : ""}
                        </td>
                      </tr>
                      
                      ${skills.length > 0 ? `
                      <tr>
                        <td style="padding-top: 10px; font-size: 11px;">
                          <span style="color: ${isDark ? "#fb7185" : "#e11d48"}; font-weight: bold;">[Stack]</span> 
                          <span style="color: ${isDark ? "#e2e8f0" : "#334155"}; font-size: 11px;">${skills.join(" + ")}</span>
                        </td>
                      </tr>` : ""}
                      
                      <tr>
                        <td style="padding-top: 12px; font-size: 11px;">
                          ${d.github ? `<a href="https://github.com/${d.github}" target="_blank" style="color: ${isDark ? "#38bdf8" : "#2563eb"}; text-decoration: none; font-weight: bold; margin-right: 14px;">$ github/${d.github}</a>` : ""}
                          ${d.linkedin ? `<a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${isDark ? "#38bdf8" : "#2563eb"}; text-decoration: none; font-weight: bold;">$ linkedin/${d.linkedin}</a>` : ""}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "coder-json-nopic",
    name: "{JSON} Config Object (No-Pic)",
    description: "Beautifully colored JSON-notation configuration theme representation. Ideal backend/systems coder design.",
    category: "Tech",
    renderPlainText: (d) => `{\n  "developer": "${d.name}",\n  "title": "${d.title}"\n}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#090d16" : "#f8fafc";
      const textPrimary = isDark ? "#ffffff" : "#0f172a";
      const keyColor = isDark ? "#f43f5e" : "#b45309"; // key variables colors (e.g. pink vs brown)
      const stringColor = isDark ? "#38bdf8" : "#0284c7"; // blue strings
      const operatorColor = isDark ? "#34d399" : "#059669"; // green braces
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";
      const skills = parseSkills(d.skills);

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'JetBrains Mono', 'Fira Code', monospace; color: ${textPrimary}; font-size: 12.5px; max-width: 490px; width: 100%; border-radius: 8px; border: 2px solid ${borderTheme}; padding: 18px;">
          <tr>
            <td>
              <font style="color: ${operatorColor}; font-weight: bold;">{</font>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-left: 12px;">
                <tr>
                  <td style="padding: 2px 0;">
                    <font style="color: ${keyColor};">"developer"</font><font style="color: ${operatorColor};">:</font> 
                    <font style="color: ${stringColor};">"${safeStr(d.name, "Sarah Chen")}"</font><font style="color: ${operatorColor};">,</font>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 2px 0;">
                    <font style="color: ${keyColor};">"role"</font><font style="color: ${operatorColor};">:</font> 
                    <font style="color: ${stringColor};">"${safeStr(d.title, "Lead Full Stack Engineer")}"</font><font style="color: ${operatorColor};">,</font>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 2px 0;">
                    <font style="color: ${keyColor};">"company"</font><font style="color: ${operatorColor};">:</font> 
                    <font style="color: ${stringColor};">"${safeStr(d.company, "StackForge")}"</font><font style="color: ${operatorColor};">,</font>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 2px 0;">
                    <font style="color: ${keyColor};">"channels"</font><font style="color: ${operatorColor};">:</font> <font style="color: ${operatorColor};">{</font>
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-left: 12px;">
                      <tr>
                        <td style="padding: 1px 0;">
                          <font style="color: ${keyColor};">"email"</font><font style="color: ${operatorColor};">:</font> 
                          <font style="color: ${stringColor};">"<a href="mailto:${d.email}" style="color: ${stringColor}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>"</font>
                          ${d.phone ? `<font style="color: ${operatorColor};">,</font>` : ""}
                        </td>
                      </tr>
                      ${d.phone ? `
                      <tr>
                        <td style="padding: 1px 0;">
                          <font style="color: ${keyColor};">"phone"</font><font style="color: ${operatorColor};">:</font> 
                          <font style="color: ${stringColor};">"${d.phone}"</font>
                        </td>
                      </tr>` : ""}
                    </table>
                    <font style="color: ${operatorColor};">}</font><font style="color: ${operatorColor};">,</font>
                  </td>
                </tr>
                
                ${d.github || d.linkedin ? `
                <tr>
                  <td style="padding: 2px 0;">
                    <font style="color: ${keyColor};">"profiles"</font><font style="color: ${operatorColor};">:</font> <font style="color: ${operatorColor};">[</font>
                    <font style="color: ${stringColor};">
                      ${d.github ? `"<a href="https://github.com/${d.github}" target="_blank" style="color: ${stringColor}; text-decoration: none;">github/${d.github}</a>"` : ""}
                      ${d.github && d.linkedin ? ", " : ""}
                      ${d.linkedin ? `"<a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${stringColor}; text-decoration: none;">linkedin/${d.linkedin}</a>"` : ""}
                    </font>
                    <font style="color: ${operatorColor};">]</font>
                    ${skills.length > 0 ? `<font style="color: ${operatorColor};">,</font>` : ""}
                  </td>
                </tr>` : ""}
                
                ${skills.length > 0 ? `
                <tr>
                  <td style="padding: 2px 0;">
                    <font style="color: ${keyColor};">"stack"</font><font style="color: ${operatorColor};">:</font> <font style="color: ${operatorColor};">[</font>
                    <font style="color: ${stringColor};">"${skills.join('", "')}"</font>
                    <font style="color: ${operatorColor};">]</font>
                  </td>
                </tr>` : ""}
              </table>
              <font style="color: ${operatorColor}; font-weight: bold;">}</font>
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "terminal-nerd-pic",
    name: "[CLI] Nerd Developer Prompt",
    description: "Console layout styled with colorful prompt indicators, green file outputs, and an integrated neon-bordered circular avatar.",
    category: "Tech",
    renderPlainText: (d) => `root@devsignature:~# cat ${d.name}.json`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#080c14" : "#ffffff";
      const textPrimary = isDark ? "#10b981" : "#111827"; // green console vs dark grey
      const textSecondary = isDark ? "#64748b" : "#475569";
      const promptColor = isDark ? "#a855f7" : "#7c3aed"; // violet prompt
      const valueColor = isDark ? "#38bdf8" : "#2563eb";
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";
      const avatarUrl = safeStr(d.profilePicture, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150");
      const skills = parseSkills(d.skills);

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'JetBrains Mono', 'Courier New', monospace; color: ${textPrimary}; font-size: 13px; max-width: 500px; width: 100%; border-radius: 8px; border: 2px solid ${borderTheme}; padding: 18px;">
          <!-- Top System Bar -->
          <tr>
            <td style="padding-bottom: 12px; border-bottom: 1px solid ${borderTheme}; font-size: 11px; color: ${textSecondary};">
              🖥️ shell v1.5 &nbsp; • &nbsp; Active Core
            </td>
          </tr>
          <tr>
            <td height="12"></td>
          </tr>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="middle">
                  <!-- Avatar Left with cyber border -->
                  <td width="70" style="width: 70px; padding-right: 16px;">
                    <img src="${avatarUrl}" width="60" height="60" alt="${d.name}" style="border-radius: 50%; object-fit: cover; border: 2px solid #10b981; display: block;" referrerPolicy="no-referrer" />
                  </td>
                  
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <td style="font-size: 12px;">
                          <font style="color: ${promptColor};">guest@dev:~#</font> <font style="color: ${isDark ? "#f43f5e" : "#e11d48"}; font-weight: bold;">whoami</font>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 18px; font-weight: bold; color: ${isDark ? "#ffffff" : "#111827"}; padding-top: 2px;">
                          ${safeStr(d.name, "Sarah Chen")}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; color: ${textPrimary};">
                          ${safeStr(d.title, "Lead Full Stack Engineer")} <font style="color: ${textSecondary};">at</font> <b>${safeStr(d.company, "StackForge")}</b>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td height="10"></td>
          </tr>
          
          <!-- Terminal output with custom file descriptors -->
          <tr>
            <td style="font-size: 12px; line-height: 1.6; padding-top: 8px; border-top: 1px dashed ${borderTheme}; color: ${isDark ? "#cbd5e1" : "#334155"};">
              👨‍💻 <font style="color: ${textSecondary};">email:</font> <a href="mailto:${d.email}" style="color: ${valueColor}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
              ${d.phone ? `<br>📱 <font style="color: ${textSecondary};">phone:</font> <span style="color: ${isDark ? "#ffffff" : "#111827"};">${d.phone}</span>` : ""}
              ${d.website ? `<br>🌐 <font style="color: ${textSecondary};">domain:</font> <a href="${d.website}" target="_blank" style="color: ${valueColor}; text-decoration: none;">${d.website.replace(/^https?:\/\//, "")}</a>` : ""}
            </td>
          </tr>
          
          ${skills.length > 0 ? `
          <tr>
            <td style="padding-top: 10px; font-size: 11px;">
              ⚡ <font style="color: ${textSecondary};">modules:</font> 
              ${skills.map(s => `<code style="background-color: ${isDark ? "#1e293b" : "#f1f5f9"}; padding: 1px 4px; border-radius: 4px; border: 1px solid ${borderTheme}; font-size: 10.5px; margin-right: 3px; color: ${isDark ? "#a7f3d0" : "#166534"};">${s}</code>`).join("")}
            </td>
          </tr>` : ""}
          
          <!-- CLI Social actions footer -->
          <tr>
            <td style="padding-top: 12px; font-size: 11px;">
              <font style="color: ${promptColor};">guest@dev:~#</font> ls profiles/
              <br>
              ${d.github ? `<a href="https://github.com/${d.github}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: bold; margin-right: 14px;">🗂️ github_${d.github}.sh</a>` : ""}
              ${d.linkedin ? `<a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textPrimary}; text-decoration: none; font-weight: bold;">🗂️ linkedin_${d.linkedin}.sh</a>` : ""}
            </td>
          </tr>
        </table>
      `;
    }
  },
  {
    id: "bracket-developer-nopic",
    name: "[Code] Bracket Developer (No-Pic)",
    description: "An ultra-clean minimalist design enclosing your developer details between large elegant code style curly brackets.",
    category: "Minimalist",
    renderPlainText: (d) => `[ ${d.name} ] ${d.title} | ${d.email}`,
    renderHTML: (d, t) => {
      const isDark = t === "dark";
      const bg = isDark ? "#0b0f19" : "#ffffff";
      const textPrimary = isDark ? "#ffffff" : "#0f172a";
      const textSecondary = isDark ? "#94a3b8" : "#475569";
      const accent = isDark ? "#6366f1" : "#4f46e5"; // indigo code color
      const borderTheme = isDark ? "#1e293b" : "#e2e8f0";
      const skills = parseSkills(d.skills);

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="background-color: ${bg}; font-family: 'JetBrains Mono', 'Courier New', monospace; color: ${textPrimary}; font-size: 13px; max-width: 480px; width: 100%; border-radius: 6px; padding: 12px;">
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr valign="middle">
                  <!-- Left giant curly bracket -->
                  <td width="24" style="font-size: 50px; font-weight: 300; line-height: 1; color: ${accent}; width: 24px; vertical-align: middle; text-align: left; font-family: sans-serif;">
                    {
                  </td>
                  
                  <!-- Inside Info panel -->
                  <td style="padding: 0 14px; border-left: 1px dotted ${borderTheme}; border-right: 1px dotted ${borderTheme};">
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <td style="font-size: 16px; font-weight: 800; color: ${textPrimary}; line-height: 1.2;">
                          ${safeStr(d.name, "Sarah Chen")}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 11.5px; color: ${accent}; font-weight: 600; padding-top: 2px;">
                          ${safeStr(d.title, "Lead Full Stack Engineer")}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 11px; color: ${textSecondary};">
                          @ ${safeStr(d.company, "StackForge")}
                        </td>
                      </tr>
                      
                      <tr>
                        <td height="8"></td>
                      </tr>
                      
                      <tr>
                        <td style="font-size: 11.5px; line-height: 1.5; color: ${textSecondary};">
                          <b>Email:</b> <a href="mailto:${d.email}" style="color: ${textPrimary}; text-decoration: none;">${safeStr(d.email, "sarah@stackforge.dev")}</a>
                          ${d.phone ? `<br><b>Phone:</b> ${d.phone}` : ""}
                          ${d.website ? `<br><b>Web:</b> <a href="${d.website}" target="_blank" style="color: ${accent}; text-decoration: none;">${d.website.replace(/^https?:\/\//, "")}</a>` : ""}
                        </td>
                      </tr>
                      
                      ${skills.length > 0 ? `
                      <tr>
                        <td style="padding-top: 8px; font-size: 10.5px; color: ${textSecondary};">
                          <i>// modules: ${skills.join(", ")}</i>
                        </td>
                      </tr>` : ""}
                      
                      <!-- Minimal text socials -->
                      <tr>
                        <td style="padding-top: 10px; font-size: 11px;">
                          ${d.github ? `<a href="https://github.com/${d.github}" target="_blank" style="color: ${textSecondary}; text-decoration: none; font-weight: bold; margin-right: 12px;">github.com/${d.github}</a>` : ""}
                          ${d.linkedin ? `<a href="https://linkedin.com/in/${d.linkedin}" target="_blank" style="color: ${textSecondary}; text-decoration: none; font-weight: bold;">linkedin.com/${d.linkedin}</a>` : ""}
                        </td>
                      </tr>
                    </table>
                  </td>
                  
                  <!-- Right giant curly bracket -->
                  <td width="24" style="font-size: 50px; font-weight: 300; line-height: 1; color: ${accent}; width: 24px; vertical-align: middle; text-align: right; font-family: sans-serif;">
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  }
];
