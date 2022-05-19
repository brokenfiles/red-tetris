import {IsNotEmpty, IsString, Length, MaxLength, MinLength} from "class-validator";

export class CreateHubDto {

    @IsNotEmpty({
        message: "The hub name is empty"
    })
    @IsString({
        message: "The hub name is not a string"
    })
    @MinLength(3, {
        message: "The hub name must be longer or equal to $constraint1 characters"
    })
    @MaxLength(16, {
        message: "The hub name must be shorter or equal to $constraint1 characters"
    })
    hubName: string

}
