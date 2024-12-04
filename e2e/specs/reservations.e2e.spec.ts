describe('Reservations', () => {
    let cookie: string;
  
    beforeAll(async () => {
      const user = {
        email: 'nir@gmail.com',
        password: 'Winter@123',
      };
      await fetch('http://auth:3001/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await fetch('http://auth:3001/auth/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const setCookie = response.headers.get('set-cookie');
      cookie = setCookie;
    });

    test('test', () => {
      expect(true).toBeTruthy()
    })
  
    test('Create & Get', async () => {
      const createdReservation = await createReservation();
      const responseGet = await fetch(
        `http://reservations:3000/reservations/${createdReservation._id}`,
        {
          headers: {
            'Cookie': cookie 
          },
        },
      );
      const reservation = await responseGet.json();
      expect(createdReservation).toEqual(reservation);
      expect(reservation).toBeDefined();
    });
  
    const createReservation = async () => {
      const responseCreate = await fetch(
        'http://reservations:3000/reservations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie
          },
          body: JSON.stringify({
            "startDate": "12/20/2022",
            "endDate": "12/25/2022",
            "placeId": "1234",
            "invoiceId": "495",
            "checkoutPayment": {
                "amount": 1
            }
          }),
        },
      );      
      expect(responseCreate.ok).toBeTruthy();
      return responseCreate.json();
    };
  });
  