(function ($) {
  'use strict'; // Start of use strict

  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, '') ==
      this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top - 70
          },
          1000,
          'easeInOutExpo'
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($('#mainNav').offset().top > 100) {
      $('#mainNav').addClass('navbar-shrink');
    } else {
      $('#mainNav').removeClass('navbar-shrink');
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Form Logic
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((box) => {
    box.addEventListener('click', function (e) {
      if (!box.classList.contains('active')) {
        checkboxes.forEach((b) => b.classList.remove('active'));
        box.classList.add('active');
      }
    });
  });

  // Project Section => Background effect
  const bg_container = document.querySelector('.project-bg-container');
  const projects = document.querySelectorAll('.project-item');
  projects.forEach((project, index) => {
    if (projects.length - 1 > index) {
      const path = `img/projects/project${index + 2}.jpg `;
      bg_container.insertAdjacentHTML(
        'beforeend',
        `<div class='project-bg' style='background-image: url("${path}")'></div>`
      );
    }

    project.addEventListener('mouseover', function (e) {
      const current = index;
      const projects = document.querySelectorAll('.project-bg');
      if (!projects[current].classList.contains('visible')) {
        projects.forEach((p) => p.classList.remove('visible', 'scale'));
        projects[current].classList.add('visible');
        setTimeout(() => {
          projects[current].classList.add('scale');
        }, 200);
      }
    });
  });

  // Contact form
  document
    .querySelector('#next-step')
    .addEventListener('click', handleNextStep);
  document
    .querySelector('#step-back')
    .addEventListener('click', handleStepBack);
  document
    .querySelector('#send-mail')
    .addEventListener('click', handleEmailSend);

  function handleNextStep() {
    const input = document.querySelector('#form-name');
    if (input.value.length >= 2) {
      const step = document.querySelector('#step-1');
      const step2 = document.querySelector('#step-2');
      step.classList.remove('active');
      step2.classList.add('active');
    }
  }

  function handleStepBack() {
    const step = document.querySelector('#step-1');
    const step2 = document.querySelector('#step-2');
    step2.classList.remove('active');
    step.classList.add('active');
  }

  function handleEmailSend(e) {
    e.preventDefault();
    const name = document.querySelector('#form-name');
    const phone = document.querySelector('#form-phone');
    if (validatePhone(phone.value)) {
      sendEmail(name.value, phone.value);
      name.value = '';
      phone.value = '';
    } else {
      alert('Перевірте введені дані!');
    }
  }

  function validatePhone(phone) {
    let a = phone.length >= 10;
    let b = phone.length <= 13;
    return (
      a &&
      b &&
      String(phone).match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )
    );
  }

  document.querySelector('form').addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(e) {
    e.preventDefault();
    const nameElement = document.querySelector('#main-name');
    const phoneElement = document.querySelector('#main-phone');
    const designElement = document.querySelector('.checkbox.active');

    const name = nameElement.value;
    const phone = phoneElement.value;
    const answer = designElement.dataset.answer === 'yes' ? 'Так' : 'Ні';
    if (name.length >= 2 && validatePhone(phone)) {
      sendEmail(name, phone, answer);
      nameElement.value = '';
      phoneElement.value = '';
    } else {
      alert('Перевірте введені дані!');
    }
  }

  function sendEmail(name, phone, design = 'Ні') {
    const data = {
      name,
      phone,
      design,
      date: new Date().toLocaleString('ua-UA')
    };
    emailjs
      .send('service_g5asens', 'template_fua2pj9', data)
      .then(() => {
        alert('Вашу заявку прийнято!');
      })
      .catch((e) => {
        alert('Помилка, спробуйте зв\'язатись з нами в інший спосіб');
        console.error(e);
      });
  }

  function sendMail(name, phone, design = 'Ні') {
    const data = new FormData;
    data.append('name', name);
    data.append('phone', phone);
    data.append('design', design);
    fetch('mail.php', {
      method: 'PUT',
      body: data
    })
      .then((r) => {
        console.log(r);
        alert('Вашу заявку прийнято!');
      })
      .catch((e) => {
        console.error(e);
        alert('Помилка, спробуйте зв\'язатись з нами в інший спосіб');
      });
  }
})(jQuery); // End of use strict
