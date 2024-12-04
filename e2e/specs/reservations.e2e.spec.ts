describe('Reservations', () => {
    let jwt: string;
  
    beforeAll(async () => {
      const user = {
        email: 'gawaliniranjan@gmail.com',
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
      console.log('Login Reponse: ');
      console.log(response);
      
      jwt = await response.text();
      console.log('JWT : ', jwt);

      let a = await response.json();
      console.log('PRINTING A');
      
      console.log(a);
      
      
    });
  
    test('Create & Get', async () => {
      const createdReservation = await createReservation();
      const responseGet = await fetch(
        `http://reservations:3000/reservations/${createdReservation._id}`,
        {
          headers: {
            authentication: jwt,
          },
        },
      );
      const reservation = await responseGet.json();
      expect(createdReservation).toEqual(reservation);
    });
  
    const createReservation = async () => {
      const responseCreate = await fetch(
        'http://reservations:3000/reservations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authentication: jwt,
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
      console.log(responseCreate);
      
      expect(responseCreate.ok).toBeTruthy();
      return responseCreate.json();
    };
  });
  