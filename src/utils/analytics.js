export const logAnalyticsEvent = (eventName, payload = {}) => {
    try {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbzLCbUAUEdyjIzGccM1uGaDBEVmEj0xYPFYhQKuJ55lco44yTbJE_sQB6JwcLoJ_M3g/exec';

        // Convert payload to query string
        const params = new URLSearchParams();
        params.append('event', eventName);
        params.append('timestamp', new Date().toISOString());

        Object.keys(payload).forEach(key => {
            params.append(key, payload[key]);
        });

        // Fire and forget GET request
        fetch(`${scriptUrl}?${params.toString()}`, {
            method: 'GET',
            mode: 'no-cors'
        }).catch(() => { });

        // Try POST as well depending on how the script is configured
        const formData = new FormData();
        formData.append('event', eventName);
        formData.append('timestamp', new Date().toISOString());
        Object.keys(payload).forEach(key => {
            formData.append(key, payload[key]);
        });

        fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).catch(() => { });

    } catch (error) {
        console.error('Analytics error:', error);
    }
};
