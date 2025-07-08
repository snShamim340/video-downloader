// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const faqItems = document.querySelectorAll('.faq-item');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const platformIcons = document.querySelectorAll('.platform-icons a');
const downloadModal = document.querySelector('.download-modal');
const closeModalBtn = document.querySelector('.close-modal');
const qualityOptions = document.getElementById('quality-options');
const downloadBtn = document.getElementById('download-btn');
const videoUrlInput = document.getElementById('video-url');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Platform Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Platform Icons Click
platformIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = icon.getAttribute('data-platform');
        videoUrlInput.placeholder = `Paste ${platform.charAt(0).toUpperCase() + platform.slice(1)} video link here...`;
        videoUrlInput.focus();
    });
});

// Close Modal
closeModalBtn.addEventListener('click', () => {
    downloadModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
        downloadModal.style.display = 'none';
    }
});

// Download Button Click
downloadBtn.addEventListener('click', () => {
    const videoUrl = videoUrlInput.value.trim();
    
    if (!videoUrl) {
        alert('Please enter a video URL');
        return;
    }
    
    // Validate URL
    if (!isValidUrl(videoUrl)) {
        alert('Please enter a valid URL');
        return;
    }
    
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    downloadBtn.disabled = true;
    
    // Simulate API call (in a real app, this would be an actual API call)
    setTimeout(() => {
        // Reset button
        downloadBtn.innerHTML = 'Download';
        downloadBtn.disabled = false;
        
        // Show modal with options
        showDownloadOptions(videoUrl);
    }, 1500);
});

// Helper function to validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Show download options modal
function showDownloadOptions(url) {
    // In a real app, you would get this data from your API
    const videoData = {
        title: "Sample Video Title",
        thumbnail: "https://via.placeholder.com/400x225",
        duration: "2:45",
        views: "1.2M",
        formats: [
            { quality: "1080p", format: "MP4", size: "45MB" },
            { quality: "720p", format: "MP4", size: "28MB" },
            { quality: "480p", format: "MP4", size: "15MB" },
            { quality: "360p", format: "MP4", size: "8MB" },
            { quality: "Audio", format: "MP3", size: "3.5MB" }
        ]
    };
    
    // Populate modal with video data
    document.getElementById('modal-title').textContent = videoData.title;
    document.getElementById('modal-thumbnail').src = videoData.thumbnail;
    document.getElementById('modal-duration').textContent = `Duration: ${videoData.duration}`;
    document.getElementById('modal-views').textContent = `Views: ${videoData.views}`;
    
    // Clear previous options
    qualityOptions.innerHTML = '';
    
    // Add quality options
    videoData.formats.forEach((format, index) => {
        const option = document.createElement('div');
        option.className = 'quality-option';
        option.innerHTML = `
            <p><strong>${format.quality}</strong></p>
            <p>${format.format}</p>
            <p>${format.size}</p>
        `;
        option.addEventListener('click', () => startDownload(url, format.quality));
        qualityOptions.appendChild(option);
    });
    
    // Show modal
    downloadModal.style.display = 'flex';
}

// Start download process
function startDownload(url, quality) {
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    const downloadProgress = document.querySelector('.download-progress');
    
    // Show progress bar
    downloadProgress.style.display = 'block';
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Downloading ${quality}... ${Math.round(progress)}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            progressText.textContent = 'Download complete!';
            
            // In a real app, this would trigger the actual download
            setTimeout(() => {
                downloadModal.style.display = 'none';
                downloadProgress.style.display = 'none';
                progressBar.style.width = '0%';
                
                // Show success message
                alert('Your download has started!');
            }, 1000);
        }
    }, 300);
}
