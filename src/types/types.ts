export type User = {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: Date;
    _id: string;
}

export type Product = {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    photo: string;
    _id: string;
}

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    phoneNo: string;
    postalCode: string;
    country: string;
}

export type CartItem = {
    productId: string;
    quantity: number;
    photo: string;
    name: string;
    price: number;
}

export type OrderItem = Omit<CartItem, "stock"> & {
    _id: string;
}

export type Order = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    shippingCharge: number;
    discount: number;
    tax: number;
    total: number;
    status: string;
    user: {
        name: string;
        _id: string;
    };
    _id: string;
}


type LatestTransaction = {
    _id: string;
    total: number;
    discount: number;
    quantity: number;
    status: string;
}

type RevenueDetails ={
    totalRevenue: number,
    thisMonth: number,
    lastMonth: number,
    change: number
}
type UsersDetails ={
    totalUsers: number,
    thisMonth: number,
    lastMonth: number,
    change: number
}
type OrdersDetails ={
    totalOrders: number,
    thisMonth: number,
    lastMonth: number,
    change: number
}
type ProductDetails ={
    totalProducts: number,
    thisMonth: number,
    lastMonth: number,
    change: number
}

export type Stats = {
    categoryCount: Record<string, number>[];
    revenue: RevenueDetails;
    users: UsersDetails;
    products: ProductDetails;
    orders: OrdersDetails;
    chart: {
        order: number[];
        revenue: number[];
    };
    genderRatio: {
        male: number;
        female: number;
    };
    latestTransactions: LatestTransaction[];
}

type RevenueDistribution = {
    totalRevenue: number;
    totalDiscount: number;
    totalTax: number;
    totalShipping: number;
    netmargin: number;
};

export type PieCharts = {
    orderStatus: {
        processing: number;
        shipped: number;
        delivered: number;
    };
    productCatergories:  Record<string, number>[];
    stockAvailable: {
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: RevenueDistribution;
    users: {
        customer: number;
        admin: number;
    };
    ageGroup: {
        teen: number;
        adult: number;
        older: number;
    }
}
export type BarCharts = {
    product: number[];
    user: number[];
    order: number[];
}
export type LineCharts = {
    product: number[];
    user: number[];
    discount: number[];
    revenue: number[];
}