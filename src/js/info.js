  const {
      ipcRenderer
  } = require('electron');
  const remote = require('electron').remote;

  const firebaseConfig = {
      apiKey: "AIzaSyASuRun1JkgfGb2TO7OBsOylbRLZKKj3XQ",
      authDomain: "tft-guide-7848f.firebaseapp.com",
      databaseURL: "https://tft-guide-7848f.firebaseio.com",
      projectId: "tft-guide-7848f",
      storageBucket: "tft-guide-7848f.appspot.com",
      messagingSenderId: "12922348984",
      appId: "1:12922348984:web:0085ec19107a3fbb"
  };

  let currWin = remote.getCurrentWindow();

  /*document.addEventListener('click', () => {
      currWin.close();
  });*/

  firebase.initializeApp(firebaseConfig);

  const ref = firebase.firestore().doc('champs/' + remote.getCurrentWindow().getTitle().toLowerCase());

  ref.onSnapshot((doc) => {
      const data = doc.data();

      let img = document.getElementById('icon');
      img.src = `data:image/png;base64,${data.icon}`;
      img.alt = data.name;

      let name = document.getElementById('name');
      let tier = document.getElementById('tier');

      name.innerHTML = data.name;
      tier.src = `../assets/images/tiers/${data.tier}.png`;
      tier.alt = data.tier;

      let originImg = new Image();
      originImg.src = `../assets/images/origins/${data.origin}.png`;
      originImg.alt = data.origin;

      let origin = document.getElementById('info_origin');
      origin.insertBefore(originImg, document.getElementById('related_champs'));

      const champRef = firebase.firestore().collection('champs');
      champRef.onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
              const champData = doc.data();

              if (champData.origin === data.origin && champData.name !== data.name) {
                  let originIcon = new Image();
                  originIcon.src = `data:image/png;base64,${champData.icon}`;
                  originIcon.alt = champData.name;

                  let relChamps = document.getElementById('related_champs');
                  relChamps.appendChild(originIcon);
              }

          });


      });

  });