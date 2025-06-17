document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            course: document.getElementById('course').value,
            modality: document.getElementById('modality').value
        };
        
        // Validación básica
        if (!formData.name || !formData.email || !formData.phone || !formData.modality) {
            showMessage('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }
        
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Por favor, introduce un correo electrónico válido.', 'error');
            return;
        }
        
        try {
            // Mostrar mensaje de carga
            showMessage('Enviando tu solicitud...', 'success');
            
            // Aquí deberías reemplazar esta URL con tu webhook real
            const webhookUrl = 'https://xuso18f.app.n8n.cloud/webhook/ed72251a-3283-4dec-86bd-d91ae65820ac';
            
            // Enviar datos al webhook
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                showMessage('¡Gracias por tu interés! Te hemos enviado un correo con los detalles de tu clase gratuita.', 'success');
                form.reset(); // Limpiar formulario
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo más tarde.', 'error');
        }
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
        
        // Ocultar mensaje después de 5 segundos (excepto para errores)
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
});
