// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.querySelectorAll('.select').forEach(el => {
    el.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            el.querySelector('ul').classList.toggle('on')
        }
        if (e.target.tagName === 'LI') {
            el.querySelector('input').value = e.target.textContent
            el.querySelector('ul').classList.remove('on')
        }
    })
})
