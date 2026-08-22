let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

if (menu) {
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navlist.classList.toggle('open');
    };
}

window.onscroll = () => {
    if (menu) {
        menu.classList.remove('bx-x');
    }
    if (navlist) {
        navlist.classList.remove('open');
    }
};

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    button.classList.add('active');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        if (navlist && navlist.classList.contains('open')) {
            if (menu) {
                menu.classList.remove('bx-x');
            }
            navlist.classList.remove('open');
        }
    });
});

const feedbackForm = document.querySelector('.feedback-section form');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const textarea = feedbackForm.querySelector('textarea');
        const feedbackMessage = textarea.value.trim();

        if (feedbackMessage === '') {
            alert('Please enter your feedback before submitting.');
            return;
        }

        console.log('Feedback submitted:', feedbackMessage);

        alert('Thank you for your feedback! We appreciate it.');

        textarea.value = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1200,
        once: true,
    });
});
