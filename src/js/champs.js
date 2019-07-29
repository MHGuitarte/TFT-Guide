        //NPM Imports
        const {
            ipcRenderer,
            remote
        } = require('electron');

        const firebaseConfig = {
            apiKey: "AIzaSyASuRun1JkgfGb2TO7OBsOylbRLZKKj3XQ",
            authDomain: "tft-guide-7848f.firebaseapp.com",
            databaseURL: "https://tft-guide-7848f.firebaseio.com",
            projectId: "tft-guide-7848f",
            storageBucket: "tft-guide-7848f.appspot.com",
            messagingSenderId: "12922348984",
            appId: "1:12922348984:web:0085ec19107a3fbb"
        };

        firebase.initializeApp(firebaseConfig);

        let index = 0;

        const ref = firebase.firestore().collection('champs');

        ref.onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                const data = doc.data();
                console.log(data.name);
                console.log(index);

                let img = document.createElement('img');
                img.id = data.name;
                img.src = 'data:image/png;base64,' + data.img;

                img.addEventListener('click', () => {
                    ipcRenderer.send('newInfo', img.id);
                });

                const col_1Champs = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51];
                const col_2Champs = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49];
                const col_3Champs = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50];

                if (col_1Champs.some(elem => elem === index)) {

                    let row = document.createElement('div');
                    row.className = 'row';
                    row.appendChild(img);
                    document.getElementById('col-0').appendChild(row);

                } else if (col_2Champs.some(elem => elem === index)) {

                    let row = document.createElement('div');
                    row.className = 'row';
                    row.appendChild(img);
                    document.getElementById('col-1').appendChild(row);

                } else if (col_3Champs.some(elem => elem === index)) {

                    let row = document.createElement('div');
                    row.className = 'row';
                    row.appendChild(img);
                    document.getElementById('col-2').appendChild(row);

                } else {
                    throw "El valor del índice no se encuentra entre los indicados";
                }

                index++;

            });
        });