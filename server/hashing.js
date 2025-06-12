import bcrypt from 'bcrypt';
const hashed = await bcrypt.hash('123456789', 10); // 10 is the salt rounds
console.log(hashed); // $2b$10$0fxmuNtGhAUDyIETySw0quzCIIBP37woWUWf.hun.wgDIJ25WrWdS