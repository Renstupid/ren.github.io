window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const btn = document.getElementById("hamburgerBtn");
    const menu = document.querySelector(".nav-menu");

    btn.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  function goToGithib() {
    window.open("https://github.com/Renstupid/", "_blank");
  }
  function goToYoutube() {
    window.open("https://www.youtube.com/", "_blank");
  }

  
  
  