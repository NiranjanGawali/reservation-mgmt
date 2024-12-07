import { AbstractRepository } from '@app/core-lib';
import { Injectable, Logger } from '@nestjs/common';
import { Reservation } from './models/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectRepository(Reservation)
    reservationRepository: Repository<Reservation>,
    entityManger: EntityManager,
  ) {
    super(reservationRepository, entityManger);
  }
}
