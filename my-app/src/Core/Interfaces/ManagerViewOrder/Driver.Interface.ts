export default interface Driver{
    driverId: string;
    driverName: string;
    driverZone: string;
    driverPhone: string;
    driverStatus: "Available" | "Busy";
}