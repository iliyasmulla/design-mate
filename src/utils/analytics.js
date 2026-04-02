// Cache location data so we only fetch it once per session
let cachedLocation = null;

const getLocation = async () => {
    if (cachedLocation) return cachedLocation;
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        cachedLocation = {
            city: data.city || '',
            region: data.region || '',
            country: data.country_name || '',
            ip: data.ip || '',
            isp: data.org || ''
        };
    } catch {
        cachedLocation = { city: '', region: '', country: '', ip: '', isp: '' };
    }
    return cachedLocation;
};

// Session ID — unique per browser tab session
const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// Track page load time to calculate time-on-page
const pageLoadTime = Date.now();

// Classify where the visitor came from more precisely than just 'direct'
const getReferrer = () => {
    const ref = document.referrer;
    const params = new URLSearchParams(window.location.search);

    // If UTM params are present, the source is a tracked campaign link
    if (params.get('utm_source')) return `campaign:${params.get('utm_source')}`;

    if (!ref) {
        // No referrer — try to narrow down why
        if (params.get('fbclid')) return 'facebook-app';       // Facebook/Instagram in-app browser strips referrer
        if (params.get('gclid')) return 'google-ads';          // Google Ads click
        if (params.get('msclkid')) return 'bing-ads';
        if (params.get('igshid') || params.get('ig_rid')) return 'instagram-app';
        return '(direct)'; // truly direct — typed URL, bookmark, or desktop app
    }

    // Parse the referrer domain
    try {
        const domain = new URL(ref).hostname.replace('www.', '');
        if (domain.includes('google')) return `google:${new URL(ref).pathname.includes('search') ? 'search' : 'other'}`;
        if (domain.includes('instagram')) return 'instagram';
        if (domain.includes('facebook')) return 'facebook';
        if (domain.includes('twitter') || domain.includes('t.co')) return 'twitter';
        if (domain.includes('linkedin')) return 'linkedin';
        if (domain.includes('whatsapp')) return 'whatsapp';
        if (domain.includes('youtube')) return 'youtube';
        if (domain.includes('producthunt')) return 'producthunt';
        return domain; // any other site — show the actual domain
    } catch {
        return ref;
    }
};

// Extract UTM params from URL once (key for marketing campaigns)
const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        utm_term: params.get('utm_term') || '',
        utm_content: params.get('utm_content') || '',
    };
};

// Detect device type from viewport width
const getDeviceType = () => {
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
};

// Pre-fetch location on load
getLocation();

export const logAnalyticsEvent = async (eventName, metadata = {}) => {
    try {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbzVAUhBKZ-c1Hg8-Kgo7QDfyYUNAtITFtOWex8PcZG7-W3-0X0lgua7kWonayd5rq_U/exec';

        const location = await getLocation();

        const data = JSON.stringify({
            // Core
            event: eventName,
            timestamp: new Date().toISOString(),
            sessionId,

            // Page context
            page: window.location.pathname,
            referrer: getReferrer(),

            // User engagement signals
            timeOnPageSec: Math.round((Date.now() - pageLoadTime) / 1000),

            // Device & browser
            deviceType: getDeviceType(),
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            language: navigator.language || '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userAgent: navigator.userAgent,
            platform: navigator.platform,

            // Marketing attribution
            ...getUtmParams(),

            // IP-based location
            ...location,

            // Any extra event-specific data (e.g. profession, email from WaitlistForm)
            ...metadata,
        });

        navigator.sendBeacon?.(scriptUrl, data) ||
            fetch(scriptUrl, { method: 'POST', mode: 'no-cors', body: data, keepalive: true }).catch(() => { });

    } catch (error) {
        console.error('Analytics error:', error);
    }
};
