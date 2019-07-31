      require('jquery');

      $(document).ready(function () {
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

                  let auxHtml = `
                    <a id="originImg"><img src="../assets/images/origins/${data.name}.png" alt="${data.name}"/></a>
                    <ul id="originListItem" style="display:none">
                        <li id="originList" class="list-group-item"><h3>${data.name}</h3></li>
                        <li id="originList" class="list-group-item"><h4>${data.desc}</h4></li>        
                `;


                  let lvl1;
                  let lvl2;
                  let lvl3;

                  if ('level_1' in data) {
                      lvl1 = `<h5>Campeones: ${data.level_1.champs}, Efectividad: ${data.level_1.chance}</h5>`;
                      auxHtml += `<li id="originList" class="list-group-item">${lvl1}</li>`;
                  }

                  if ('level_2' in data) {
                      lvl2 = `<h5>Campeones: ${data.level_2.champs}, Efectividad: ${data.level_2.chance}</h5>`;
                      auxHtml += `<li id="originList" class="list-group-item">${lvl2}</li>`;
                  }

                  if ('level_3' in data) {
                      lvl3 = `<h5>Campeones: ${data.level_3.champs}, Efectividad: ${data.level_3.chance}</h5>`;
                      auxHtml += `<li id="originList" class="list-group-item">${lvl3}</li></ul>`;
                  }

                  originParent.innerHTML = auxHtml;

              });

              $(document).on('click', '#originImg', () => {
                  $('#originListItem').toggle('slow');
              });

              let origin = document.getElementById('info_origin');
              document.getElementById('related_origins').append(originParent);

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

              //Origin 2 Handling

              if ('origin2' in data) {
                  let origin2Parent = document.createElement('div');
                  origin2Parent.className = 'originInfo';

                  const origin2Ref = firebase.firestore().doc('origins/' + data.origin2);

                  origin2Ref.onSnapshot((doc) => {
                      const data = doc.data();

                      let auxHtml = `
                      <a id="origin2Img"><img src="../assets/images/origins/${data.name}.png" alt="${data.name}"/></a>
                      <ul id="origin2ListItem" style="display:none">
                          <li id="origin2List" class="list-group-item"><h3>${data.name}</h3></li>
                          <li id="origin2List" class="list-group-item"><h4>${data.desc}</h4></li>        
                  `;


                      let lvl1;
                      let lvl2;
                      let lvl3;

                      if ('level_1' in data) {
                          lvl1 = `<h5>Campeones: ${data.level_1.champs}, Efectividad: ${data.level_1.chance}</h5>`;
                          auxHtml += `<li id="origin2List" class="list-group-item">${lvl1}</li>`;
                      }

                      if ('level_2' in data) {
                          lvl2 = `<h5>Campeones: ${data.level_2.champs}, Efectividad: ${data.level_2.chance}</h5>`;
                          auxHtml += `<li id="origin2List" class="list-group-item">${lvl2}</li>`;
                      }

                      if ('level_3' in data) {
                          lvl3 = `<h5>Campeones: ${data.level_3.champs}, Efectividad: ${data.level_3.chance}</h5>`;
                          auxHtml += `<li id="origin2List" class="list-group-item">${lvl3}</li></ul>`;
                      }

                      origin2Parent.innerHTML = auxHtml;

                  });

                  $(document).on('click', '#origin2Img', () => {
                      $('#origin2ListItem').toggle('slow');
                  });

                  document.getElementById('nd_origins').append(origin2Parent);

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

              //TODO: Classes handling and introducing data for 'Demonio' origin in API (this is for design testing)

          });

      });