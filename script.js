document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('feedbackModal');
    const btn = document.getElementById('feedbackBtn');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('feedbackForm');
    const messageDiv = document.getElementById('formMessage');

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    form.onsubmit = async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage('Сообщение успешно отправлено!', 'success');
                form.reset();
                setTimeout(() => {
                    modal.style.display = 'none';
                    messageDiv.style.display = 'none';
                }, 2000);
            } else {
                showMessage('Ошибка: ' + result.message, 'error');
            }
        } catch (error) {
            showMessage('Ошибка сети: ' + error, 'error');
        }
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        messageDiv.style.color = type === 'success' ? '#155724' : '#721c24';
    }
});