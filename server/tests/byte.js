const b = new ArrayBuffer(2);

const c = new ArrayBuffer(1);

c[0] = 0x02;

console.log(c)

b[0] = 0xFF;
b[1] = 128;

const b1 = (b[1] & 0xf0) % 0x0f
const b2 = b[1] & 0x0f;

console.log(b[1].toString(16), b1.toString(16),b2.toString(16))