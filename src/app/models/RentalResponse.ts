import { Car } from "./Car";
import { Customer } from "./Customer";

export interface RentalResponse {
    id: number;
    startDate: string;
    endDate: string;
    status?: string;
    totalCost?: number;
    customer?: Customer;
    car?: Car;
}