type Address = { address: string; city: string };
type PresentDeliveryList<T extends object> = Record<keyof T, Address>;
