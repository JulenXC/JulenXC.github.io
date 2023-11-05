let boss = "";
let bosses;

let htmlBuilder = "";

let playable = true;

function setBoss(bossPosition) {
  boss = bossPosition;
}

function reader() {
  bosses = [];
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", "./src/js/bosses.txt", false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        allText.split("\r\n").forEach((element) => {
          bosses.push(element.split(";"));
        });
      }
    }
  };
  rawFile.send(null);
  return bosses.length;
}

function comprobation(guess) {
  gameTable = document.getElementById("gameTable");

  if (guess != "" && playable && bosses[guess][7] == "false") {
    bosses[guess][7] = true;

    let bossRow = document.createElement("tr");

    for (i = 1; i <= 6; i++) {
      if (bosses[boss][i] == bosses[guess][i]) {
        data = document.createElement("td");
        data.setAttribute("class", "good");
        data.innerHTML = bosses[guess][i];
      } else {
        data = document.createElement("td");
        data.setAttribute("class", "bad");
        data.innerHTML = bosses[guess][i];
      }
      bossRow.appendChild(data);
    }

    if (gameTable.children.length > 1) {
      gameTable.insertBefore(bossRow, gameTable.children[1]);
    } else {
      gameTable.appendChild(bossRow);
    }

    setTimeout(() => {
      if (bosses[boss] == bosses[guess]) {
        document.getElementById("bossGuess").disabled = true;
        document.getElementById("btnGuess").disabled = true;
        alert("Congratulations!");
      }
    }, 500);
  }
}

function loadOptions() {
  setBoss(Math.floor(Math.random() * (reader() - 1)));
  let select = document.getElementById("bossGuess");
  let htmlBuilder = "<option value=''>Select Boss</option>";
  bosses.forEach((element) => {
    htmlBuilder += `<option value="${element[0]}">${element[1]}</option>`;
  });
  select.innerHTML = htmlBuilder;
}
