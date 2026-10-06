document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('applicationForm');
    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModalButton = document.getElementById('closeModal');

    const fields = [
        {
            input: document.getElementById('fullName'),
            error: document.getElementById('fullNameError'),
            validate: (value) => {
                if (value.trim() === '') {
                    return { valid: false, message: 'Full name is required.' };
                }
                if (value.trim().length < 3) {
                    return { valid: false, message: 'Full name must be at least 3 characters.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: (value) => {
                if (value.trim() === '') {
                    return { valid: false, message: 'Email address is required.' };
                }
                if (!value.includes('@') || !value.includes('.')) {
                    return { valid: false, message: 'Email must include @ and a domain.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('phone'),
            error: document.getElementById('phoneError'),
            validate: (value) => {
                if (value.trim() === '') {
                    return { valid: false, message: 'Phone number is required.' };
                }
                if (!/^\d{10}$/.test(value.trim())) {
                    return { valid: false, message: 'Phone number must be exactly 10 digits.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('saId'),
            error: document.getElementById('saIdError'),
            validate: (value) => {
                if (value.trim() === '') {
                    return { valid: false, message: 'SA ID number is required.' };
                }
                if (!/^\d{13}$/.test(value.trim())) {
                    return { valid: false, message: 'SA ID number must be exactly 13 digits.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('city'),
            error: document.getElementById('cityError'),
            validate: (value) => {
                if (value.trim() === '') {
                    return { valid: false, message: 'City of residence is required.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('jobCategory'),
            error: document.getElementById('jobCategoryError'),
            validate: (value) => {
                if (value === '') {
                    return { valid: false, message: 'Please select a job category.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('experience'),
            error: document.getElementById('experienceError'),
            validate: (value) => {
                if (value.trim() === '') {
                    return { valid: false, message: 'Years of experience is required.' };
                }
                const num = Number(value);
                if (!Number.isInteger(num) || num < 0 || num > 50) {
                    return { valid: false, message: 'Experience must be a whole number between 0 and 50.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('qualification'),
            error: document.getElementById('qualificationError'),
            validate: (value) => {
                if (value === '') {
                    return { valid: false, message: 'Please select your highest qualification.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('coverLetter'),
            error: document.getElementById('coverLetterError'),
            validate: (value) => {
                if (value.trim() === '') {
                    return { valid: false, message: 'Cover letter is required.' };
                }
                if (value.trim().length < 50) {
                    return { valid: false, message: 'Cover letter must be at least 50 characters.' };
                }
                return { valid: true, message: '' };
            }
        },
        {
            input: document.getElementById('startDate'),
            error: document.getElementById('startDateError'),
            validate: (value) => {
                if (value === '') {
                    return { valid: false, message: 'Start date is required.' };
                }
                const selectedDate = new Date(`${value}T00:00:00`);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    return { valid: false, message: 'Start date cannot be in the past.' };
                }
                return { valid: true, message: '' };
            }
        }
    ];

    const setStatus = (field, isValid, message) => {
        field.input.classList.remove('is-valid', 'is-invalid');
        field.error.textContent = '';

        if (!isValid) {
            field.input.classList.add('is-invalid');
            field.error.textContent = message;
            return;
        }

        field.input.classList.add('is-valid');
    };

    const validateField = (field) => {
        const result = field.validate(field.input.value);
        setStatus(field, result.valid, result.message);
        return result.valid;
    };

    const validateWorkType = () => {
        const selectedWorkType = document.querySelector('input[name="workType"]:checked');
        const error = document.getElementById('workTypeError');
        const group = document.querySelectorAll('input[name="workType"]');

        error.textContent = '';
        group.forEach((input) => input.classList.remove('is-invalid', 'is-valid'));

        if (!selectedWorkType) {
            error.textContent = 'Please choose a preferred work type.';
            group.forEach((input) => input.classList.add('is-invalid'));
            return false;
        }

        group.forEach((input) => input.classList.add('is-valid'));
        return true;
    };

    const validateAgreement = () => {
        const agreement = document.getElementById('agreement');
        const error = document.getElementById('agreementError');
        error.textContent = '';
        agreement.classList.remove('is-invalid', 'is-valid');

        if (!agreement.checked) {
            agreement.classList.add('is-invalid');
            error.textContent = 'You must agree before submitting.';
            return false;
        }

        agreement.classList.add('is-valid');
        return true;
    };

    const validateForm = () => {
        let isValid = true;

        fields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!validateWorkType()) {
            isValid = false;
        }

        if (!validateAgreement()) {
            isValid = false;
        }

        return isValid;
    };

    const resetForm = () => {
        form.reset();
        fields.forEach((field) => {
            field.input.classList.remove('is-valid', 'is-invalid');
            field.error.textContent = '';
        });

        document.querySelectorAll('input[name="workType"]').forEach((input) => {
            input.classList.remove('is-valid', 'is-invalid');
        });

        document.getElementById('agreement').classList.remove('is-valid', 'is-invalid');
        document.getElementById('workTypeError').textContent = '';
        document.getElementById('agreementError').textContent = '';
    };

    const closeModal = () => {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        resetForm();
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        modalMessage.textContent = `Thank you, ${fullName}. Your application has been received. We will be in touch at ${email}.`;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    });

    fields.forEach((field) => {
        field.input.addEventListener('input', () => validateField(field));
        field.input.addEventListener('change', () => validateField(field));
    });

    document.querySelectorAll('input[name="workType"]').forEach((input) => {
        input.addEventListener('change', validateWorkType);
    });

    document.getElementById('agreement').addEventListener('change', validateAgreement);
    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});
