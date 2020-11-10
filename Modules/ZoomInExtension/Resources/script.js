const joinSeparator = '/j/';

// Wait for the page to load
window.addEventListener("load", function(event) {
    
    let meetingId;
    let meetingOptions;
    
    // Get the URL from Zoom’s page
    // Check if the zoom location looks like a join meeting URL
    if (window.location.origin.match(/(.*?).zoom\.us/g) && window.location.pathname.indexOf(joinSeparator) != -1) {
        
        // Parse the meeting ID from the path
        let meetingIdPrefix = window.location.pathname.replace(joinSeparator, '');
        if (meetingIdPrefix.indexOf('/') != -1) {
            meetingId = meetingIdPrefix.substring(0, meetingIdPrefix.indexOf('/'));
        } else {
            meetingId = meetingIdPrefix;
        }
        
        // Get any additional meeting options (password etc.)
        meetingOptions = window.location.search.replace('?', '');
        
    } else {
        return;
    }
    
    if (!meetingId) {
        return;
    }
    
    // Build the native URL from the parameters we parsed
    let url = 'zoommtg://zoom.us/join?confno=' + meetingId + '&' + meetingOptions;
    
    // Tell the native extension about the URL
    safari.extension.dispatchMessage('open', { url: url });
});
