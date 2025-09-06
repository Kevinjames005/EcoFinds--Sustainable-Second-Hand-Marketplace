
export enum Category {
    Electronics = 'Electronics',
    Furniture = 'Furniture',
    Clothing = 'Clothing',
    Books = 'Books',
    Other = 'Other'
}

export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    category: Category;
    price: number;
    imageUrl: string;
    seller: User;
    createdAt: Date;
}

export interface Order {
    id: string;
    buyer: User;
    products: Product[];
    totalAmount: number;
    purchaseDate: Date;
}
