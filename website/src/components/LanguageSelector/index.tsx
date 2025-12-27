import React, { useState, useMemo } from 'react';
import { useTranslation, languages } from '../../context/TranslationContext';
import styles from './styles.module.css';

// Group languages by region for better organization
const languageRegions = [
  { name: 'Featured', codes: ['en', 'ur', 'ur-easy'] },
  { name: 'Middle East & North Africa', codes: ['ar', 'ar-eg', 'ar-ae', 'fa', 'he'] },
  { name: 'South Asia', codes: ['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'pa', 'si', 'ne'] },
  { name: 'East Asia', codes: ['zh', 'zh-tw', 'ja', 'ko', 'mn'] },
  { name: 'Southeast Asia', codes: ['id', 'ms', 'th', 'vi', 'tl', 'my', 'km'] },
  { name: 'Europe - Western', codes: ['es', 'es-mx', 'fr', 'de', 'it', 'pt', 'pt-pt', 'nl'] },
  { name: 'Europe - Northern', codes: ['sv', 'no', 'da', 'fi'] },
  { name: 'Europe - Eastern', codes: ['ru', 'uk', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sr'] },
  { name: 'Europe - Southern', codes: ['el', 'tr'] },
  { name: 'Africa', codes: ['sw', 'am', 'ha', 'yo', 'zu', 'af'] },
  { name: 'Central Asia', codes: ['kk', 'uz', 'az'] },
];

export default function LanguageSelector() {
  const { currentLang, setCurrentLang, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];
  const urduLang = languages.find(l => l.code === 'ur');
  const easyUrduLang = languages.find(l => l.code === 'ur-easy');

  // Filter languages based on search
  const filteredLanguages = useMemo(() => {
    if (!searchTerm) return languages;
    const term = searchTerm.toLowerCase();
    return languages.filter(
      lang =>
        lang.name.toLowerCase().includes(term) ||
        lang.country.toLowerCase().includes(term) ||
        lang.code.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Group filtered languages by region
  const groupedLanguages = useMemo(() => {
    if (searchTerm) {
      return [{ name: 'Search Results', languages: filteredLanguages }];
    }
    return languageRegions.map(region => ({
      name: region.name,
      languages: region.codes
        .map(code => languages.find(l => l.code === code))
        .filter(Boolean)
    })).filter(region => region.languages.length > 0);
  }, [filteredLanguages, searchTerm]);

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  const isUrduSelected = currentLang === 'ur' || currentLang === 'ur-easy';

  return (
    <div className={styles.languageSelectorContainer}>
      {/* Special Urdu Buttons - Side by Side */}
      <div className={styles.urduButtonsContainer}>
        {/* Standard Urdu Button */}
        {urduLang && currentLang !== 'ur' && (
          <button
            className={styles.urduSpecialBtn}
            onClick={() => handleLanguageSelect('ur')}
            title="Switch to Urdu"
          >
            <span className={styles.urduFlag}>{urduLang.flag}</span>
            <span className={styles.urduText}>{t('specialUrdu')}</span>
            <span className={styles.urduGlow}></span>
          </button>
        )}

        {/* Easy Urdu Button - Extra Special */}
        {easyUrduLang && currentLang !== 'ur-easy' && (
          <button
            className={`${styles.easyUrduBtn}`}
            onClick={() => handleLanguageSelect('ur-easy')}
            title="Switch to Easy Urdu - Simplified for beginners"
          >
            <span className={styles.easyUrduIcon}>✨</span>
            <span className={styles.easyUrduFlag}>{easyUrduLang.flag}</span>
            <span className={styles.easyUrduText}>آسان اردو</span>
            <span className={styles.easyUrduBadge}>Easy!</span>
            <span className={styles.easyUrduGlow}></span>
          </button>
        )}
      </div>

      {/* Main Language Selector */}
      <div className={styles.languageSelector}>
        <button
          className={styles.selectedLanguage}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={styles.flagEmoji}>{currentLanguage.flag}</span>
          <span className={styles.langName}>{currentLanguage.name}</span>
          <span className={styles.langCount}>({languages.length})</span>
          <svg
            className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
            <div className={styles.dropdown} role="listbox">
              <div className={styles.dropdownHeader}>
                <span className={styles.globeIcon}>🌍</span>
                <span>{t('selectLanguage')}</span>
                <span className={styles.totalCount}>{languages.length} languages</span>
              </div>

              {/* Search Input */}
              <div className={styles.searchContainer}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    className={styles.clearSearch}
                    onClick={() => setSearchTerm('')}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className={styles.languageList}>
                {groupedLanguages.map((region) => (
                  <div key={region.name} className={styles.regionGroup}>
                    <div className={styles.regionHeader}>{region.name}</div>
                    {region.languages.map((lang: any) => (
                      <button
                        key={lang.code}
                        className={`${styles.languageOption} ${currentLang === lang.code ? styles.active : ''} ${lang.special ? styles.specialLang : ''} ${lang.easyMode ? styles.easyModeLang : ''}`}
                        onClick={() => handleLanguageSelect(lang.code)}
                        role="option"
                        aria-selected={currentLang === lang.code}
                      >
                        <span className={styles.optionFlag}>{lang.flag}</span>
                        <div className={styles.optionInfo}>
                          <span className={styles.optionName}>{lang.name}</span>
                          <span className={styles.optionCountry}>{lang.country}</span>
                        </div>
                        {currentLang === lang.code && (
                          <svg className={styles.checkmark} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                        )}
                        {lang.special && !lang.easyMode && (
                          <span className={styles.specialBadge}>Featured</span>
                        )}
                        {lang.easyMode && (
                          <span className={styles.easyBadge}>✨ Easy</span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}

                {filteredLanguages.length === 0 && (
                  <div className={styles.noResults}>
                    <span>🔍</span>
                    <p>No languages found for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
