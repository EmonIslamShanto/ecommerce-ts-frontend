import { BarCharts, CartItem, LineCharts, Order, PieCharts, Product, ShippingInfo, Stats, User } from "./types";

export type CustomError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    }
}

export type MesssageResponse = {
    success: boolean;
    message: string;
};
export type AllUsersResponse = {
    success: boolean;
    users: User[];
};

export type UserResponse = {
    success: boolean;
    user: User;
};

export type AllProductsResponse = {
    success: boolean;
    products: Product[];
};

export type ProductsResponse = {
    success: boolean;
    product: Product;
};
export type CategoriesResponse = {
    success: boolean;
    categories: string[];
};

export type searchProductsResponse = AllProductsResponse & {
    totalPage: number;
    currentPage: number;
    totalProducts: number;
};


export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
};

export type OrderDetailsResponse = {
    success: boolean;
    order: Order;
};


export type StatsResponse = {
    success: boolean;
    stats: Stats;
}
export type PieResponse = {
    success: boolean;
    charts: PieCharts;
}
export type BarResponse = {
    success: boolean;
    charts: BarCharts;
}
export type LineResponse = {
    success: boolean;
    charts: LineCharts;
}


export type searchProductsRequest = {
    page: number;
    sort: string;
    price: number;
    category: string;
    search: string;
}

export type NewProductRequest = {
    id: string;
    formdata: FormData;
}
export type UpdateProductRequest = {
    userId: string;
    productId: string;
    formdata: FormData;
}
export type DeleteProductRequest = {
    userId: string;
    productId: string;
}

export type NewOrderRequest = {
    user: string;
    shippingInfo: ShippingInfo;
    orderItems: CartItem[];
    subtotal: number;
    shippingCharge: number;
    discount: number;
    tax: number;
    total: number;
}
export type UpdateOrderRequest = {
    userId: string;
    orderId: string;
}

export type DeleteUserRequest = {
    userId: string;
    adminUserId: string;
}

