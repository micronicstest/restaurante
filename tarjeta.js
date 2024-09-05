document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');
    const paymentMethodInputs = document.querySelectorAll('input[name="payment-method"]');
    const methodDetails = document.querySelectorAll('.method-details');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el envío del formulario para validación

        // Obtención de valores del formulario
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const idType = document.getElementById('id-type').value;
        const idNumber = document.getElementById('id-number').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const district = document.getElementById('district').value;
        const reference = document.getElementById('reference').value.trim();
        const notes = document.getElementById('notes').value.trim();

        // Validación básica de campos
        if (!firstName || !lastName || !idNumber || !phone || !email || !address || !reference) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        if (!/^\d{8,11}$/.test(idNumber)) {
            alert('Número de identificación inválido.');
            return;
        }

        if (!/^\d{9}$/.test(phone)) {
            alert('Número de teléfono inválido.');
            return;
        }

        // Validar si se ha seleccionado un método de pago
        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!selectedPaymentMethod) {
            alert('Por favor, seleccione un método de pago.');
            return;
        }

        // Simulación de envío exitoso
        alert('¡Pago realizado con éxito!');

        // Redirigir a una página de confirmación o a una página de agradecimiento
        window.location.href = 'confirmation.html'; // Cambia esto a la URL de la página de confirmación
    });

    paymentMethodInputs.forEach(input => {
        input.addEventListener('change', () => {
            // Ocultar todos los detalles de método de pago
            methodDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            // Mostrar el detalle correspondiente
            const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
            const detailToShow = document.getElementById(`${selectedMethod}-details`);
            if (detailToShow) {
                detailToShow.classList.add('active');
            }
        });
    });
});
