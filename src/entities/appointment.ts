export interface AppointmentProps {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment {
    private props: AppointmentProps

    get customer () {
        return this.props.customer
    }

    get startsAt () {
        return this.props.startsAt
    }

    get endsAt () {
        return this.props.endsAt
    }
    
    constructor(props: AppointmentProps) {
        if (props.startsAt <= new Date()) {
            throw new Error('Invalid start date')
            
        }

        if (props.endsAt <= props.startsAt) {
            throw new Error('Invalid end date')
        }

        this.props = props
    }
}