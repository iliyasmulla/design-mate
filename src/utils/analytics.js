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

// Pre-fetch location on load
getLocation();

export const logAnalyticsEvent = async (eventName) => {
    try {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbzVAUhBKZ-c1Hg8-Kgo7QDfyYUNAtITFtOWex8PcZG7-W3-0X0lgua7kWonayd5rq_U/exec';

        const location = await getLocation();

        const data = JSON.stringify({
            event: eventName,
            timestamp: new Date().toISOString(),
            referrer: document.referrer || '(direct)',
            userAgent: navigator.userAgent,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform,
            ...location
        });

        navigator.sendBeacon?.(scriptUrl, data) ||
            fetch(scriptUrl, { method: 'POST', mode: 'no-cors', body: data, keepalive: true }).catch(() => { });

    } catch (error) {
        console.error('Analytics error:', error);
    }
};
