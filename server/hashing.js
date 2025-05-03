import bcrypt from 'bcrypt';
const hashed = await bcrypt.hash('123456789', 10); // 10 is the salt rounds
console.log(hashed); // $2b$10$e0c5a1f3d4c8e4f8a7b8OeO6Q9Z5J5J5J5J5J5J5J5J5J5J5J5J5