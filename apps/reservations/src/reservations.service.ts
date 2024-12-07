import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE, User } from '@app/core-lib';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Reservation } from './models/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { id: userId, email }: User,
  ) {
    return this.paymentService
      .send('checkout_payment', {
        ...createReservationDto.checkoutPayment,
        email,
      })
      .pipe(
        map(async (res) => {
          const reservation = new Reservation({
            ...createReservationDto,
            invoiceId: res?.id,
            timestamp: new Date(),
            userId,
          });

          return await this.reservationsRepository.create(reservation);
        }),
      );
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(id: number) {
    return this.reservationsRepository.findOne({ id });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { id },
      updateReservationDto,
    );
  }

  remove(id: number) {
    return this.reservationsRepository.findOneAndDelete({ id });
  }
}
