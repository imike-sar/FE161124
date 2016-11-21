const scrollTop = document.body.scrollTop;
const menuNode = document.querySelector('.menu');
const offset = menuNode.getBoundingClientRect();
const menuOffsetTop = offset.top + scrollTop;
let isMenuSticked = false;

document.addEventListener('scroll', function () {
  const scrollTop = document.body.scrollTop;

  if (scrollTop > menuOffsetTop && !isMenuSticked) {
    menuNode.classList.add('menu--stiky');
    isMenuSticked = true;
  } else if (scrollTop <= menuOffsetTop && isMenuSticked) {
    menuNode.classList.remove('menu--stiky');
    isMenuSticked = false;
  }
});
