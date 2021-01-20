import * as sapper from '@sapper/app'

sapper.start({ target: document.querySelector('#sapper') }).then(() => {
  console.log('Welcome to Episense App')
})
