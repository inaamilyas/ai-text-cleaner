/**
 * Client-Side Google Analytics 4 (GA4) Custom Event Tracking Helper.
 * Tracks tool runs, button clicks, copies, downloads, option toggles, preset selections, and language changes.
 */

// Declare global gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Generic helper to send GA4 custom event.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * Tracks when a user executes a text cleaning operation.
 */
export function trackCleanTextRun({
  toolName = 'general_text_cleaner',
  inputWords = 0,
  inputChars = 0,
  changesCount = 0,
}: {
  toolName?: string;
  inputWords?: number;
  inputChars?: number;
  changesCount?: number;
}) {
  trackEvent('clean_text_execute', {
    tool_name: toolName,
    input_words: inputWords,
    input_chars: inputChars,
    changes_removed: changesCount,
  });
}

/**
 * Tracks when a user copies output text to clipboard.
 */
export function trackCopyText({
  toolName = 'general_text_cleaner',
  copyFormat = 'plain_text',
}: {
  toolName?: string;
  copyFormat?: string;
}) {
  trackEvent('copy_text_click', {
    tool_name: toolName,
    copy_format: copyFormat,
  });
}

/**
 * Tracks when a user downloads a cleaned file (.txt, .pdf).
 */
export function trackDownloadFile({
  toolName = 'general_text_cleaner',
  fileType = 'txt',
}: {
  toolName?: string;
  fileType?: string;
}) {
  trackEvent('download_file_click', {
    tool_name: toolName,
    file_type: fileType,
  });
}

/**
 * Tracks when a user selects a preset chip.
 */
export function trackPresetSelect(presetName: string) {
  trackEvent('preset_select', {
    preset_name: presetName,
  });
}

/**
 * Tracks when a user toggles a specific cleaning option.
 */
export function trackOptionToggle(optionKey: string, isEnabled: boolean) {
  trackEvent('option_toggle', {
    option_key: optionKey,
    is_enabled: isEnabled,
  });
}

/**
 * Tracks language changes.
 */
export function trackLanguageChange(targetLang: string) {
  trackEvent('language_change', {
    target_language: targetLang,
  });
}

/**
 * Tracks FAQ accordion expands.
 */
export function trackFAQExpand(questionText: string) {
  trackEvent('faq_expand', {
    question: questionText,
  });
}
