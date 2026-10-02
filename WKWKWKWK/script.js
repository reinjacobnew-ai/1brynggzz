// ============================================================
// 1. Dynamic greeting — changes based on time of day
// ============================================================
(function setGreeting(){
  const el = document.getElementById('greeting');
  if(!el) return;

  const hour = new Date().getHours();
  let text;

  if(hour < 5)       text = "Still up?";
  else if(hour < 12)  text = "Good morning.";
  else if(hour < 17)  text = "Good afternoon.";
  else if(hour < 21)  text = "Good evening.";
  else                text = "Working late.";

  el.textContent = text;
})();


// ============================================================
// 2. Timeline scroll animation — reveals each step as it
//    enters the viewport
// ============================================================
(function animateTimeline(){
  const items = document.querySelectorAll('.timeline-item');
  if(!items.length) return;

  if(!('IntersectionObserver' in window)){
    items.forEach(item => item.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  items.forEach(item => observer.observe(item));
})();


// ============================================================
// 3. Contact form validation
// ============================================================
(function validateContactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const status = document.getElementById('form-status');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, errorEl, message){
    input.closest('.field').classList.toggle('invalid', Boolean(message));
    errorEl.textContent = message || '';
  }

  function validateName(){
    const value = nameInput.value.trim();
    const errorEl = document.getElementById('name-error');
    if(value.length === 0){
      setError(nameInput, errorEl, 'Please enter your name.');
      return false;
    }
    if(value.length < 2){
      setError(nameInput, errorEl, 'Name looks too short.');
      return false;
    }
    setError(nameInput, errorEl, '');
    return true;
  }

  function validateEmail(){
    const value = emailInput.value.trim();
    const errorEl = document.getElementById('email-error');
    if(value.length === 0){
      setError(emailInput, errorEl, 'Please enter your email.');
      return false;
    }
    if(!emailPattern.test(value)){
      setError(emailInput, errorEl, 'That email address doesn\'t look right.');
      return false;
    }
    setError(emailInput, errorEl, '');
    return true;
  }

  function validateMessage(){
    const value = messageInput.value.trim();
    const errorEl = document.getElementById('message-error');
    if(value.length === 0){
      setError(messageInput, errorEl, 'Please add a short message.');
      return false;
    }
    if(value.length < 10){
      setError(messageInput, errorEl, 'A little more detail would help (10+ characters).');
      return false;
    }
    setError(messageInput, errorEl, '');
    return true;
  }

  // Validate on blur for immediate feedback
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  messageInput.addEventListener('blur', validateMessage);

  form.addEventListener('submit', function(e){
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if(isNameValid && isEmailValid && isMessageValid){
      status.textContent = `Thanks, ${nameInput.value.trim()} — your message is ready to send.`;
      status.className = 'form-status success';
      form.reset();
      document.querySelectorAll('.field').forEach(f => f.classList.remove('invalid'));
      document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    } else {
      status.textContent = 'Please fix the highlighted fields before sending.';
      status.className = 'form-status error';
    }
  });
})();
