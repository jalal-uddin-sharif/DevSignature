/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DeveloperData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  portfolio: string;
  twitter: string;
  profilePicture: string;
  skills: string; // Comma separated, e.g. "React, Node.js, TypeScript"
}

export interface SignatureTemplate {
  id: string;
  name: string;
  description: string;
  /**
   * Returns the clean, compile-ready, email-client proof HTML string with full inline styles.
   */
  renderHTML: (data: DeveloperData, theme: 'light' | 'dark') => string;
  /**
   * Returns a plain text fallback representation.
   */
  renderPlainText: (data: DeveloperData) => string;
}
