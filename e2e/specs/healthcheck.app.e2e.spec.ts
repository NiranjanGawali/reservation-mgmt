import { ping } from 'tcp-ping';

describe('Health', () => {
    test('Reservations ', async () => {
      const response = await fetch('http://reservations:3000');
      expect(response.ok).toBeTruthy()
    })
    test('Auth ', async () => {
        const response = await fetch('http://auth:3001');
        expect(response.ok).toBeTruthy()
      })

      test('Auth TCP', (done) => {
        ping({ address: 'auth', port: 3002 }, (err) => {
          if (err) {
            fail();
          }
          done();
        });
      });
    
  test('Payments TCP', (done) => {
    ping({ address: 'payments', port: 3003 }, (err) => {
      if (err) {
        fail();
      }
      done();
    });
  });

//   test('Payments  ', async () => {
//     const response = await fetch('http://payments:3004');
//     console.log(response);
    
//     expect(response.ok).toBeTruthy()
//   })

  test('Notifications TCP', (done) => {
    ping({ address: 'notifications', port: 3005 }, (err) => {
      if (err) {
        fail();
      }
      done();
    });
  });
      
})