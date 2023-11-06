let boss = 0;
let bosses = [];

let htmlBuilder = "";

let playable = true;

fetch("./src/js/data.json")
  .then((response) => response.json())
  .then((data) => setBosses(data))
  .catch((error) => console.error("Error fetching JSON:", error));

function setBosses(data) {
  bosses = data.bosses;
  boss += Math.floor(Math.random() * bosses.length) - 1;
}

function loadOptions() {
  let select = document.getElementById("bossGuess");
  htmlBuilder = "<option value=''>Select Boss</option>";
  bosses.forEach((bossData) => {
    htmlBuilder += `<option value='${bossData.code}'>${bossData.name}</option>`;
  });
  select.innerHTML = htmlBuilder;
}

function comprobation(guess) {
  gameTable = document.getElementById("gameTable");

  if (guess != "" && playable && bosses[guess].tried == "false") {
    bosses[guess].tried = true;

    let bossRow = document.createElement("tr");

    htmlBuilder = `<td class="${bosses[boss].name == bosses[guess].name}">${
      bosses[guess].name
    }</td>`;

    htmlBuilder += `<td class="${bosses[boss].forms == bosses[guess].forms}">${
      bosses[guess].forms
    }</td>`;

    htmlBuilder += `<td class="${
      bosses[boss].difficulty == bosses[guess].difficulty
    }">${bosses[guess].difficulty}</td>`;

    htmlBuilder += `<td class="${
      bosses[boss].species == bosses[guess].species
    }">${bosses[guess].species}</td>`;

    htmlBuilder += `<td class="${
      bosses[boss].mainColor == bosses[guess].mainColor
    }">${bosses[guess].mainColor}</td>`;

    htmlBuilder += `<td class="${
      bosses[boss].secondaryColor == bosses[guess].secondaryColor
    }">${bosses[guess].secondaryColor}</td>`;

    bossRow.innerHTML = htmlBuilder;

    if (gameTable.children.length > 0) {
      gameTable.insertBefore(bossRow, gameTable.children[0]);
    } else {
      gameTable.appendChild(bossRow);
    }

    setTimeout(() => {
      if (bosses[boss] == bosses[guess]) {
        document.getElementById("bossGuess").disabled = true;
        document.getElementById("btnGuess").disabled = true;
        if (confirm("Congratulations! Do you want to play again?")) {
          window.location.href = "/calamitydle/";
        }
      }
    }, 500);
  }
}
