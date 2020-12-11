// Define variables & objects
const burgerBtn = document.querySelector('.menu__btn');
const tabButtons = document.querySelectorAll('.js-dropdown-btn');

// Define handler's functions
/**
 * Open/close menu
 *
 */
function openMenu() {
  burgerBtn.classList.toggle('menu__btn_active');
}

/**
 * Change tab-content
 *
 * @param {HTMLElement} target
 */
function changeTabContent(target) {
  const contentTab = target.nextElementSibling;
  if (target.classList.contains('is-select')) {
    hideAllTab();
  } else {
    hideAllTab();
    target.classList.add('is-select');
    showTabContent(contentTab);
  }
}

/**
 * Hide tab-content
 *
 * @param {HTMLElement} element
 */
function hideAllTab() {
  for (const tabButton of tabButtons) {
    tabButton.classList.remove('is-select');
    tabButton.nextElementSibling.style.height = '0';
    tabButton.querySelector('.js-dropdown-arrow').classList.remove('is-rotate');
  }
}

/**
 * Show tab-content
 *
 * @param {HTMLElement} element
 */
function showTabContent(element) {
  element.style.height = element.scrollHeight + 'px';
  element.previousElementSibling.querySelector('.js-dropdown-arrow')
      .classList.add('is-rotate');
}

/**
 * Event's call
 *
 */
document.addEventListener('DOMContentLoaded', () => {
  // Call open/close menu
  burgerBtn.addEventListener('click', openMenu);

  // Call change tab-content
  if (document.documentElement.clientWidth <= 576) {
    for (const tabButton of tabButtons) {
      tabButton.addEventListener('click', (event) => {
        changeTabContent(event.currentTarget);
      });
    }
  }
});
