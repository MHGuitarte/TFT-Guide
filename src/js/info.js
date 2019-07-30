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

  firebase.initializeApp(firebaseConfig);

  const ref = firebase.firestore().doc('champs/' + currWin.getTitle().toLowerCase());

  ref.onSnapshot((doc) => {
      const data = doc.data();

      //Header handling

      let img = document.getElementById('icon');
      img.src = `data:image/png;base64,${data.icon}`;
      img.alt = data.name;

      let name = document.getElementById('name');
      let tier = document.getElementById('tier');

      name.innerHTML = data.name;
      tier.src = `../assets/images/tiers/${data.tier}.png`;
      tier.alt = data.tier;

      //Origins handling

      let originParent = document.createElement('div');
      originParent.className = 'originInfo';

      const originRef = firebase.firestore().doc('origins/' + data.origin);

      originRef.onSnapshot((doc) => {
          const data = doc.data();
          console.log(data);

          let lvl1;
          let lvl2;
          let lvl3;

          if ('level_1' in data) {
              lvl1 = `<h5>Campeones: ${data.level_1.champs}, Probabilidad: ${data.level_1.chance}%</h5>`;
          }

          if ('level_2' in data) {
              lvl2 = `<h5>Campeones: ${data.level_2.champs}, Probabilidad: ${data.level_2.chance}%</h5>`;
          }

          if ('level_3' in data) {
              lvl3 = `<h5>Campeones: ${data.level_3.champs}, Probabilidad: ${data.level_3.chance}%</h5>`;
          }

          console.log(data.name);

          originParent.innerHTML = `

          <table>
            <tr>
                <td>
                <img class="originInfo" src="../assets/images/origins/${data.name}.png" alt="${data.name}"/>
                </td>
                <td><h3 class="originInfo">${data.name}</h3></td>
                <td><h4 class="originDesc">${data.desc}</h4></td>
                <td class="originLvl">
                    <ul>
                        <li>${lvl1}</li>
                        <li>${lvl2}</li>
                        <li>${lvl3}</li>
                    </ul>
                </td>
            </tr>
          </table>

          
            
            
           
            `;


          console.log(originParent.innerHTML);

          console.log(originParent);

      });



      let origin = document.getElementById('info_origin');
      origin.insertBefore(originParent, document.getElementById('related_origins'));

      const champRef = firebase.firestore().collection('champs');
      champRef.onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
              const champData = doc.data();

              if (champData.origin === data.origin && champData.name !== data.name) {
                  let originIcon = new Image();
                  originIcon.src = `data:image/png;base64,${champData.icon}`;
                  originIcon.alt = champData.name;

                  originIcon.addEventListener('click', () => {
                      ipcRenderer.send('newInfo', originIcon.alt);

                  });

                  let relChamps = document.getElementById('related_origins');
                  relChamps.appendChild(originIcon);
              }

          });

      });

      if ('origin2' in data) {
          let origin2Img = new Image();
          origin2Img.src = `../assets/images/origins/${data.origin2}.png`;
          origin2Img.alt = data.origin2;

          //let origin = document.getElementById('info_origin');
          origin.insertBefore(origin2Img, document.getElementById('nd_origins'));

          //const champRef = firebase.firestore().collection('champs');
          champRef.onSnapshot((snapshot) => {
              snapshot.forEach((doc) => {
                  const champData = doc.data();

                  if (champData.origin === data.origin2 && champData.name !== data.name) {
                      let origin2Icon = new Image();
                      origin2Icon.src = `data:image/png;base64,${champData.icon}`;
                      origin2Icon.alt = champData.name;

                      origin2Icon.addEventListener('click', () => {
                          ipcRenderer.send('newInfo', origin2Icon.alt);

                      });

                      let rel2Champs = document.getElementById('nd_origins');
                      rel2Champs.appendChild(origin2Icon);
                  }

              });

          });
      }

  });