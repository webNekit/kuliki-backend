export interface CallbackResponseType {
    id: string;
    name: string;
    phone: string;
    message: string | null;
    processed: boolean;
    createdAt: Date;
    user?: {
        id: string;
        email: string;
        fullName: string;
    } | null;
}

export interface CallbackResponseList {
    items: CallbackResponseType[];
    total: number;
}