// Usa la IP de tu máquina local en lugar de localhost para dispositivos físicos o emuladores
const BASE_URL = process.env.BASE_URL || "http://192.168.0.11:5000/api"; // IP que aparece en tus logs

export default BASE_URL;
