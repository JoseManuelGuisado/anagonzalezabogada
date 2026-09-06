/**
 * form.js — Envío del formulario de contacto a WhatsApp.
 */

'use strict';

var WHATSAPP_PHONE = '34687827441';

/**
 * Construye el texto del mensaje de WhatsApp a partir de los datos del formulario.
 * @param {{ name: string, email: string, phone: string, subject: string, message: string }} data
 * @returns {string}
 */
function buildWhatsAppMessage(data) {
	return [
		'Hola, me gustaría concertar una cita. Mis datos son:',
		'',
		'*Nombre:* ' + data.name.trim(),
		'*Correo:* ' + data.email.trim(),
		'*Teléfono:* ' + data.phone.trim(),
		'*Asunto:* ' + data.subject.trim(),
		'*Mensaje:* ' + data.message.trim()
	].join('\n');
}

/**
 * Genera la URL de WhatsApp con el número y el mensaje codificado.
 * @param {{ name: string, email: string, phone: string, subject: string, message: string }} data
 * @param {string} [phone=WHATSAPP_PHONE]
 * @returns {string}
 */
function createWhatsAppUrl(data, phone) {
	var whatsappPhone = String(phone || WHATSAPP_PHONE).replace(/\D/g, '');
	var text = buildWhatsAppMessage(data);

	return 'https://wa.me/' + whatsappPhone + '?text=' + encodeURIComponent(text);
}

/**
 * Abre WhatsApp en una nueva pestaña sin navegar fuera de la página actual.
 * @param {{ name: string, email: string, phone: string, subject: string, message: string }} data
 * @param {Document} [doc=document]
 * @returns {string}
 */
function openWhatsAppContact(data, doc) {
	var url = createWhatsAppUrl(data);
	var currentDocument = doc || document;
	var link = currentDocument.createElement('a');

	link.href = url;
	link.target = '_blank';
	link.rel = 'noopener noreferrer';
	link.style.display = 'none';

	currentDocument.body.appendChild(link);
	link.click();
	currentDocument.body.removeChild(link);

	if (typeof window !== 'undefined' && typeof window.focus === 'function') {
		window.focus();
	}

	return url;
}

if (typeof window !== 'undefined') {
	window.openWhatsAppContact = openWhatsAppContact;
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		WHATSAPP_PHONE: WHATSAPP_PHONE,
		buildWhatsAppMessage: buildWhatsAppMessage,
		createWhatsAppUrl: createWhatsAppUrl,
		openWhatsAppContact: openWhatsAppContact
	};
}
