const form = document.getElementById('form');
const qrcodeElement = document.getElementById('qrcode');
const spinner = document.getElementById('loading');
const btnSave = document.getElementById('btn-save');
const sizeSelector = document.getElementById('size');

// Function to generate QR code
function generateQRcode(e) {
    if (e) e.preventDefault();  // Prevent form submission if this is a form event

    const url = document.getElementById('url').value || 'https://your-default-url.com'; // Default URL
    const size = document.getElementById('size').value || '100';  // Get size from the selector
    const darkColor = document.getElementById('dark-color').value || '#000000'; // Default dark color
    const lightColor = document.getElementById('light-color').value || '#ffffff'; // Default light color

    spinner.style.display = 'flex';

    setTimeout(() => {
        // Hide Spinner
        spinner.style.display = 'none';

        // Clear previous QR code
        qrcodeElement.innerHTML = "";

        // Create the QR code
        const qrCode = new QRCode(qrcodeElement, {
            text: url,
            width: parseInt(size),
            height: parseInt(size),
            colorDark: darkColor,
            colorLight: lightColor,
        });

        // Wait for the QR code to render and enable download
        setTimeout(() => {
            const qrImage = qrcodeElement.querySelector('img');
            if (qrImage) {
                const imgSrc = qrImage.src;
                btnSave.href = imgSrc;
                btnSave.download = 'qrcode.png';
            }
        }, 100); // Delay to ensure the image is rendered

    }, 1000); // Delay for spinner
}

// Event listener for form submission
form.addEventListener('submit', generateQRcode);

// Event listener for size change to regenerate the QR code
sizeSelector.addEventListener('change', generateQRcode);

// Generate a default QR code on page load
window.onload = function() {
    generateQRcode();
};
