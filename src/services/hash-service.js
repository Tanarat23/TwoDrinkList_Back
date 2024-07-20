// bcrypt = แฮชรหัสผ่านของผู้ใช้ก่อนที่จะบันทึกลงฐานข้อมูล
const bcrypt = require('bcryptjs');

const hashService = {};

// ใช้ bcrypt.hash เพื่อเข้ารหัส plainText โดยใช้ saltRounds จำนวน 12 รอบ
hashService.hash = (plainText) => bcrypt.hash(plainText, 12);
// เปรียบเทียบ plainText กับ hashValue
hashService.compare = (plainText, hashValue) =>
  bcrypt.compare(plainText, hashValue);

module.exports = hashService;
