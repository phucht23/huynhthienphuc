'use strict';

// ==========================================
// TAB NAVIGATION
// ==========================================

const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Remove active class from all
    navBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked
    btn.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ==========================================
// CONTACT TOGGLE
// ==========================================

const contactToggleBtn = document.getElementById('contactToggleBtn');
const contactInfo = document.getElementById('contactInfo');

if (contactToggleBtn) {
  contactToggleBtn.addEventListener('click', () => {
    contactToggleBtn.classList.toggle('active');
    contactInfo.classList.toggle('show');
  });
}

// ==========================================
// CERTIFICATES UPLOAD & MANAGEMENT
// ==========================================

const certUpload = document.getElementById('certUpload');
const certificatesGrid = document.getElementById('certificatesGrid');

// Load certificates from localStorage
let certificates = JSON.parse(localStorage.getItem('certificates')) || [];

// Display certificates
function displayCertificates() {
  certificatesGrid.innerHTML = '';
  
  if (certificates.length === 0) {
    certificatesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <ion-icon name="images-outline" style="font-size: 64px; margin-bottom: 16px;"></ion-icon>
        <p>No certificates uploaded yet. Click the button above to add some!</p>
      </div>
    `;
    return;
  }
  
  certificates.forEach((cert, index) => {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    card.innerHTML = `
      <img src="${cert.data}" alt="Certificate ${index + 1}" loading="lazy">
      <button class="certificate-delete" onclick="deleteCertificate(${index})" title="Delete certificate">
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    `;
    certificatesGrid.appendChild(card);
  });
}

// Upload certificate
if (certUpload) {
  certUpload.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Check total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const maxSize = 10 * 1024 * 1024; // 10MB total
    
    if (totalSize > maxSize) {
      alert('Total file size exceeds 10MB. Please select smaller files.');
      certUpload.value = '';
      return;
    }
    
    // Process each file
    let processed = 0;
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file.`);
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = function(e) {
        certificates.push({
          data: e.target.result,
          name: file.name,
          uploadedAt: new Date().toISOString()
        });
        
        processed++;
        
        // Save and display when all files processed
        if (processed === files.length) {
          saveCertificates();
          displayCertificates();
          showNotification('Certificate(s) uploaded successfully!');
        }
      };
      
      reader.onerror = function() {
        alert(`Error reading ${file.name}`);
      };
      
      reader.readAsDataURL(file);
    });
    
    // Reset input
    certUpload.value = '';
  });
}

// Delete certificate
function deleteCertificate(index) {
  if (confirm('Are you sure you want to delete this certificate?')) {
    certificates.splice(index, 1);
    saveCertificates();
    displayCertificates();
    showNotification('Certificate deleted successfully!');
  }
}

// Save certificates to localStorage
function saveCertificates() {
  try {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      alert('Storage limit exceeded. Please delete some certificates.');
    } else {
      console.error('Error saving certificates:', e);
    }
  }
}

// Make deleteCertificate available globally
window.deleteCertificate = deleteCertificate;

// Display certificates on page load
displayCertificates();

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate
    if (!name || !email || !message) {
      showNotification('Please fill in all fields!', 'error');
      return;
    }
    
    // Simulate sending (replace with actual backend call)
    console.log('Form data:', { name, email, message });
    
    // Show success message
    showNotification('Message sent successfully! (Demo mode)');
    
    // Reset form
    contactForm.reset();
  });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'success') {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <ion-icon name="${type === 'success' ? 'checkmark-circle' : 'alert-circle'}"></ion-icon>
    <span>${message}</span>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4caf50' : '#f44336'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    font-size: 15px;
    font-weight: 500;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .notification ion-icon {
    font-size: 24px;
  }
`;
document.head.appendChild(style);

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// LAZY LOAD IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #ffdb70;');
console.log('%cInterested in the code? Check out the source on GitHub!', 'font-size: 14px; color: #9e9e9e;');

// ==========================================
// EXPORT CERTIFICATES AS JSON
// ==========================================

window.exportCertificates = function() {
  const dataStr = JSON.stringify(certificates, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'certificates-backup.json';
  link.click();
  URL.revokeObjectURL(url);
  showNotification('Certificates exported successfully!');
};

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search (if implemented)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // Focus search input if exists
  }
  
  // Esc to close modals/notifications
  if (e.key === 'Escape') {
    const notification = document.querySelector('.notification');
    if (notification) notification.remove();
  }
});

console.log('✅ Profile script loaded successfully!');