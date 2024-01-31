import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";

export class AuthenticatePersistence {

    static comparePassword = async (username: string, enteredPassword: string) => {
        const user = await myDataSource.getRepository(User).findOne({
            where: {
                username: username
            }
        })

        if (!user) {
            return "No username"
        }

        const isPasswordMatch = await user.comparePassword(enteredPassword)

        if (isPasswordMatch) {
            return "succeed"
        } else {
            return "Password is wrong"
        }
        
    }

}