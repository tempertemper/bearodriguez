(function () {
  const form = document.querySelector('form[name="contact"]');
  if (!form) return;

  const maxMessageLength = 1000;
  const ERROR_SUMMARY_ID = 'form-error-summary';
  const INLINE_ERROR_CLASS = 'form-error';

  // Validation rules
  const fields = [
    { id: 'name', required: 'Enter your name' },
    { id: 'email', required: 'Enter your email address' },
    {
      id: 'message',
      required: 'Enter your message',
      maxLength: maxMessageLength,
      maxLengthMessage: `Message must be under ${maxMessageLength} characters`
    }
  ];

  // Store original aria-describedby values
  const originalDescribedBy = {};
  fields.forEach(field => {
    const el = document.getElementById(field.id);
    if (el) {
      originalDescribedBy[field.id] = el.getAttribute('aria-describedby') || '';
    }
  });

  function clearErrors() {
    const summary = document.getElementById(ERROR_SUMMARY_ID);
    if (summary) summary.remove();

    fields.forEach(field => {
      const el = document.getElementById(field.id);
      if (!el) return;

      el.removeAttribute('aria-invalid');

      const inline = document.getElementById(field.id + '-error');
      if (inline) inline.remove();

      const original = originalDescribedBy[field.id];
      if (original) {
        el.setAttribute('aria-describedby', original);
      } else {
        el.removeAttribute('aria-describedby');
      }
    });
  }

  function addInlineError(field, message) {
    const el = document.getElementById(field.id);
    if (!el) return;

    const existingDescribedBy = originalDescribedBy[field.id] || '';

    const error = document.createElement('div');
    error.id = field.id + '-error';
    error.className = INLINE_ERROR_CLASS;
    error.textContent = message;

    el.insertAdjacentElement('beforebegin', error);
    el.setAttribute('aria-invalid', 'true');

    const newDescribedBy = existingDescribedBy
      ? `${existingDescribedBy} ${error.id}`.trim()
      : error.id;

    el.setAttribute('aria-describedby', newDescribedBy);
  }

  function addSummary(errors) {
    const existing = document.getElementById(ERROR_SUMMARY_ID);
    if (existing) existing.remove();

    const summary = document.createElement('div');
    summary.id = ERROR_SUMMARY_ID;
    summary.className = 'error-summary';
    summary.setAttribute('role', 'alert');
    summary.setAttribute('tabindex', '-1');

    const title = document.createElement('h2');
    title.textContent = 'There is a problem';
    summary.appendChild(title);

    const list = document.createElement('ul');

    errors.forEach(err => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${err.id}`;
      a.textContent = err.message;
      li.appendChild(a);
      list.appendChild(li);
    });

    summary.appendChild(list);
    form.insertBefore(summary, form.firstChild);
    summary.focus();
  }

  form.addEventListener('submit', event => {
    clearErrors();

    const errors = [];

    fields.forEach(field => {
      const el = document.getElementById(field.id);
      if (!el) return;

      const value = (el.value || '').trim();

      if (!value) {
        errors.push({ id: field.id, message: field.required });
        return;
      }

      if (
        field.id === 'email' &&
        el.type === 'email' &&
        el.validity.typeMismatch
      ) {
        errors.push({
          id: field.id,
          message: 'Enter an email address in the correct format'
        });
        return;
      }

      if (field.maxLength && value.length > field.maxLength) {
        errors.push({ id: field.id, message: field.maxLengthMessage });
        return;
      }
    });

    if (errors.length) {
      event.preventDefault();

      errors.forEach(err => {
        const field = fields.find(f => f.id === err.id);
        if (field) addInlineError(field, err.message);
      });

      addSummary(errors);
    }
  });
})();
