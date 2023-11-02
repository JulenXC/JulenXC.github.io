// Esta función crea un array de NxN con valores aleatorios de 0 a n^2 -1

function Aleatorio(N) {
  // Crear una matriz vacía de NxN
  const matriz = new Array(N);

  for (let i = 0; i < N; i++) {
    matriz[i] = new Array(N);
  }

  // Crear un conjunto para almacenar valores únicos
  const valoresDisponibles = new Set();

  while (valoresDisponibles.size < N * N) {
    // Generar un valor aleatorio entre 0 y N^2 - 1
    const valorAleatorio = Math.floor(Math.random() * (N * N));

    // Agregar el valor al conjunto si aún no está presente
    valoresDisponibles.add(valorAleatorio);
  }
  let f0, c0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // Escoger un valor aleatorio del conjunto
      const valorAleatorio = [...valoresDisponibles][0];
      valoresDisponibles.delete(valorAleatorio);
      // Asignar el valor aleatorio a la celda
      matriz[i][j] = valorAleatorio;
      if (valorAleatorio == 0) {
        f0 = i;
        c0 = j;
      }
    }
  }

  [matriz[f0][c0], matriz[N - 1][N - 1]] = [
    matriz[N - 1][N - 1],
    matriz[f0][c0],
  ];

  var iSuma = 0;

  for (let f = 0; f < N; f++) {
    for (let c = 0; c < N; c++) {
      //Primero miramos en el resto de la fila
      for (let iCol = c + 1; iCol < N; iCol++) {
        iSuma += matriz[f][c] > matriz[f][iCol] && matriz[f][iCol] != 0 ? 1 : 0;
      }
      //Y ahora el resto de la tabla

      for (let iFila = f + 1; iFila < N; iFila++) {
        for (let iCol = 0; iCol < N; iCol++) {
          iSuma +=
            matriz[f][c] > matriz[iFila][iCol] && matriz[iFila][iCol] != 0
              ? 1
              : 0;
        }
      }
    }
  }

  if (iSuma % 2 != 0) {
    Intercambiar(matriz, 0, 0, 0, 1);
    console.log("arreglado");
  }

  return matriz;
}

function Intercambiar(aMiTabla, i, j, k, m) {
  var iAux = aMiTabla[i][j];
  aMiTabla[i][j] = aMiTabla[k][m];
  aMiTabla[k][m] = iAux;
}

function CrearTablaCartas(N, M) {
  // Paso 1: Generar una lista con valores aleatorios de 1 a NxM/2
  let valores = [];
  for (let i = 1; i <= (N * M) / 2; i++) {
    valores.push(i);
  }

  // Paso 2: Duplicar los valores para que cada número aparezca exactamente 2 veces
  valores = valores.concat(valores);

  // Paso 3: Revolver los valores
  for (let i = valores.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valores[i], valores[j]] = [valores[j], valores[i]];
  }

  // Paso 4: Crear un array 2D y llenarlo con los valores mezclados
  let resultado = [];
  for (let i = 0; i < N; i++) {
    let fila = [];
    for (let j = 0; j < M; j++) {
      fila.push(valores[i * M + j]);
    }
    resultado.push(fila);
  }

  return resultado;
}
