export class CurrentAccount {
    public id: number = 0
    public username: string = ""
    public password: string = ""
    public firstName: string = ""
    public lastName: string = ""
    public email: string = ""
    public imageUrl: string | null = null
    public activated: boolean = false
    public langKey: string | null = null
    public createdBy: string | null = null
    public createdDate: Date = new Date()
    public lastModifiedBy: string | null = null
    public lastModifiedDate: Date = new Date()
    public authorities: Array<string> = [];
    public constructor(
        fields?: {
            id?: number,
            login?: string,
            password?: string,
            firstName?: string,
            lastName?: string,
            phoneNumber?: string,
            email?: string,
            imageUrl?: string | null,
            activated?: boolean,
            langKey?: string | null,
            createdBy?: string | null,
            lastModifiedBy?: string | null,
            createdDate?: Date,
            lastModifiedDate?: Date,
            authorities?: Array<string>,
        }) {
        if (fields) Object.assign(this, fields);
    }
}

export class SaveMyAccountRequest{
    public firstName: string = ""
    public lastName: string = ""

    public constructor(
        fields?: {            
            firstName?: string,
            lastName?: string            
        }) {
        if (fields) Object.assign(this, fields);
    }
}

export class ChangePasswordRequest{
    public currentPassword: string = ""
    public newPassword: string = ""

    public constructor(
        fields?: {            
            currentPassword?: string,
            newPassword?: string            
        }) {
        if (fields) Object.assign(this, fields);
    }
}