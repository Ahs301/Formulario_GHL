document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageDiv.style.display = 'none';

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const course = document.getElementById('course').value.trim();
        const modality = document.getElementById('modality').value;

        // Validación básica
        if (!name || !email || !phone || !modality) {
            showMessage('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('course', course);
        formData.append('modality', modality);

        try {
            showMessage('Enviando tu solicitud...', 'success');

            const webhookUrl = 'https://serx301.app.n8n.cloud/webhook/b79b7227-8fec-47f8-a720-4d48020d4543';

            const response = await fetch(webhookUrl, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showMessage('¡Gracias por tu interés! Te contactaremos pronto.', 'success');
                form.reset();
            } else {
                const errorText = await response.text();
                showMessage('Error del servidor: ' + errorText, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error al enviar la solicitud. Intenta más tarde.', 'error');
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';

        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
});
