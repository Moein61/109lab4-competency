export class Post{
    public message: String;
    public imageUrl: String;
    public from: String;
    public to: String;
    public createdOn: Date;

    constructor(){

        this.to="everyone";
        this.createdOn= new Date(); 

    } 

}