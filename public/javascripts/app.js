var pageref = document.getElementsByTagName("html")[0];

const toogleTheme = () => {
    if( pageref.className == "dark") {
        pageref.classList.remove('dark');
        pageref.classList.add('light');
    } else {
        pageref.classList.remove('light');
        pageref.classList.add('dark');
    }
}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
  .then((register) => console.log('registeres', register))
  .catch((error) => console.log('not registered', error))
}