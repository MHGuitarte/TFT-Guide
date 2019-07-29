const {
    ipcRenderer
} = require('electron');

const exit = document.getElementById('exit');

exit.addEventListener('click', () => {
    ipcRenderer.send('closing');
});