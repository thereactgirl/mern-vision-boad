// main.js
const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/visions', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'vis',
        quote: 'I find your lack of faith disturbing.'
      })
    })
  })