export declare const EventStatus: {
    readonly PENDING: "PENDING";
    readonly ONGOING: "ONGOING";
    readonly COMPLETED: "COMPLETED";
};
export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];
