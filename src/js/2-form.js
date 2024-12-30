const formData = {
  email: '',
  message: '',
};

const feedbackFormEl = document.querySelector('.feedback-form');

const fillFormFields = () => {
  try {
    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    if (!formDataFromLS) {
      return;
    }

    for (const key in formDataFromLS) {
      if (feedbackFormEl.elements[key]) {
        feedbackFormEl.elements[key].value = formDataFromLS[key];
        formData[key] = formDataFromLS[key];
      }
    }
  } catch (err) {
    console.error('Помилка при зчитуванні з localStorage:', err);
  }
};

const onFieldFormInput = event => {
  const formFieldEl = event.target;

  if (!formFieldEl.name) {
    return;
  }

  formData[formFieldEl.name] = formFieldEl.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormSubmit = event => {
  event.preventDefault();

  const isFormComplete = Object.values(formData).every(
    value => value.trim() !== ''
  );
  if (!isFormComplete) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data:', formData);

  Object.keys(formData).forEach(key => (formData[key] = ''));
  feedbackFormEl.reset();
};

fillFormFields();
feedbackFormEl.addEventListener('input', onFieldFormInput);
feedbackFormEl.addEventListener('submit', onFormSubmit);
