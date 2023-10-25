export interface PostUserRequest {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    age: number;
    is_active: boolean;
    registration_date: string;
    address: Address;
}

interface Address {
    street: string;
    city: string;
    state: string;
    postal_code: string;
}
