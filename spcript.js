document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageDiv.style.display = 'none';

        // Validación básica
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const modality = document.getElementById('modality').value;

        if (!name || !email || !phone || !modality) {
            showMessage('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, introduce un correo electrónico válido.', 'error');
            return;
        }

        try {
            showMessage('Enviando tu solicitud...', 'success');

            const webhookUrl = 'https://xuso18f.app.n8n.cloud/webhook-test/ed72251a-3283-4dec-86bd-d91ae65820ac';

            const formData = new FormData(form);

            const response = await fetch(webhookUrl, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showMessage('¡Gracias por tu interés! Te hemos enviado un correo con los detalles de tu clase gratuita.', 'success');
                form.reset();
            } else {
                const errorText = await response.text();
                showMessage('Error del servidor: ' + errorText, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo más tarde.', 'error');
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
