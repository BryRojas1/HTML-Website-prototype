'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
let currentTheme = localStorage.getItem('theme') || 'light';

document.body.className = currentTheme;

let toggleButton = document.getElementById('mode-switcher');
toggleButton.addEventListener('click', function() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = currentTheme;
    localStorage.setItem('theme', currentTheme);
});
});

let gallery = document.querySelector('.gallery');
document.addEventListener('DOMContentLoaded', (event) => {
gallery.addEventListener('click', function(event) {
    if(event.target.tagName === 'IMG') {
        let figureImg = document.querySelector('figure img');
        figureImg.src = event.target.src;
        figureImg.alt = event.target.alt;
        let figcaption = document.querySelector('figure figcaption');
        figcaption.textContent = figureImg.alt;
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

leftBtn.addEventListener('click', swipe);
rightBtn.addEventListener('click', swipe);

function swipe(e){
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex;

    if(e.currentTarget.classList.contains('left')){
        if(currentIndex === 0){
            nextIndex = CAROUSEL_SIZE - 1;
        }
        else{
            nextIndex = currentIndex - 1;
        }       
    }
    else{
        if(currentIndex === CAROUSEL_SIZE - 1){
            nextIndex = 0;
        }
        else{
            nextIndex = currentIndex + 1;
        }
    }

    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');

}
navItems.forEach((navItem, index) => {
    navItem.addEventListener('click', function() {
        const currentCarouselItem = document.querySelector('.carousel-item.active');
        const currentNavItem = document.querySelector('.nav-item.active');

        if (currentNavItem === navItem) {
            return;
        }

        currentCarouselItem.classList.remove('active');
        currentNavItem.classList.remove('active');

        carouselItems[index].classList.add('active');
        navItem.classList.add('active');
           });
        });

        let cleaningForm = document.querySelector("#cleaningForm");
        cleaningForm.addEventListener("submit", function(event) {
            // Prevent the form from being submitted
            event.preventDefault();
    
            // Get the form data
            let email = document.querySelector("#email").value;
            let address = document.querySelector("#address").value;
    
            // Fetch the validation result from the Mailcheck API
            fetch(`https://api.mailcheck.ai/v1/validate?email=${email}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.result !== 'valid') {
                    // Display a helpful message to the user
                    document.querySelector("#emailError").innerHTML = "Please enter a valid email address.";
                } else {
                    // If the email is valid, validate the address
                    fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.features.length === 0) {
                            // Display a helpful message to the user
                            document.querySelector("#addressError").innerHTML = "Please enter a valid address.";
                        } else {
                            // If the address is valid, continue with form submission
                            // ...
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
