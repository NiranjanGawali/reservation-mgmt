import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReservationDocument } from './src/models/reservation.schema';
import { ReservationsService } from './src/reservations.service';
import { CreateReservationDto } from './src/dto/create-reservation.dto';
import { CurrentUser, UserDto } from '@app/core-lib';

@Resolver(() => ReservationDocument)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationsService) {}

  @Mutation(() => ReservationDocument)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.reservationService.create(createReservationInput, user);
  }

  @Query(() => [ReservationDocument], { name: 'reservations' })
  findAll() {
    return this.reservationService.findAll();
  }

  @Query(() => ReservationDocument, { name: 'reservation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reservationService.findOne(id);
  }

  @Mutation(() => ReservationDocument)
  removeReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationService.remove(id);
  }
}
