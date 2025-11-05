function* demo() {
  console.log('A')
  const val = yield 100 // <– DỪNG tại đây, trả ra 100
  console.log('B', val)
  const val1 = yield 200 // <– DỪNG tại đây, trả ra 100
  console.log('C', val1)
  return 'Done'
}

const gen = demo()

console.log(gen.next()) // ▶ "A" → { value: 100, done: false }
console.log(gen.next('XYZ')) // ▶ "B XYZ" → { value: 'Done', done: true }
console.log(gen.next('ABC')) // ▶ "B XYZ" → { value: 'Done', done: true }
