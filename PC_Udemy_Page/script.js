'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ----------------------------------
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML = '这是新加入的一条消息！<button class="btn btn--close-cookie">Got it!</button>';

// header.append(message);
// document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove());

message.style.backgroundColor = '#37383d';    //背景颜色改为黑色。。
message.style.width = '120%';       //宽度改为12%。。

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';     //高度增加 30px。。
document.documentElement.style.setProperty('--color-primary', "orangered");                     //吧主题色改为橙色。。

// --------------------------------

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });          //点击平滑到下一项。。用 scrollIntoView 方法可以免去麻烦的计算。
})

// --------------------------------
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();     //取消 a 标签的默认跳转事件。。
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// })
// 也可以使用事件委托。。
document.querySelector('.nav__links').addEventListener('click', function (e) {    //获取导航栏的父元素。。
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {     //  通过方法查找是否有这个子元素。
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})