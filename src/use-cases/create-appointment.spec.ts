import { InMemoryAppointmentRepository } from './../repositories/in-memory/in-memory-appointment-repository';
import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/get-future-date";

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const appointmentRepository = new InMemoryAppointmentRepository()
        const createAppointment = new CreateAppointment(appointmentRepository)

        const startsAt = getFutureDate('2024-04-20')
        const endsAt = getFutureDate('2024-04-21')
    
        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment with overlapping dates', async () => {
        const appointmentRepository = new InMemoryAppointmentRepository()
        const createAppointment = new CreateAppointment(appointmentRepository)

        const startsAt = getFutureDate('2024-04-22')
        const endsAt = getFutureDate('2024-04-26')
    
        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2024-04-25'),
            endsAt: getFutureDate('2024-04-30')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2024-04-20'),
            endsAt: getFutureDate('2024-04-26')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2024-04-20'),
            endsAt: getFutureDate('2024-04-30')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2024-04-24'),
            endsAt: getFutureDate('2024-04-25')
        })).rejects.toBeInstanceOf(Error)
    })

})