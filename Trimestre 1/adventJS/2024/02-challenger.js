function createFrame(names) {
  let longitudLarga = 0;

  for (const nombre of names) {
    if (nombre.length > longitudLarga) {
      longitudLarga = nombre.length;
    }
  }

  let marco = longitudLarga + 2;
  console.log(marco);
  return longitudLarga;
}

console.log(createFrame(["henan", "david", "bartolome"]));
