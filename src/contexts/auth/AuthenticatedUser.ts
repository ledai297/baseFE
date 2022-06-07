export class AuthenticatedUser{
    
    public id: number = 0
    public username: string = ""
    public firstName: string = ""
    public lastName: string = ""
    public email: string = ""
    public imageUrl: string | null = null;
    public authorities: Array<string> = new Array<string>();

    public constructor(
        fields?: {
            id?: number,
            username?: string,
            firstName?: string,
            lastName?: string,
            email?: string,
            imageUrl?: string | null,
            authorities?: Array<string>,
        }) {
            if (fields) 
                Object.assign(this, fields);
        }  
}