export type TUser = {
    id: number;
    username: string;
    password: string;
    refreshToken?: string | null;
    createdAt: Date;
    messages: TMessage[];
};

export type TGroup = {
    id: number;
    name: string;
    messages: TMessage[];
};

export type TMessage = {
    id: number;
    text: string;
    username: string;
    group: TGroup;
    createdAt: Date;
    isAuthorMessage?: boolean;
};
