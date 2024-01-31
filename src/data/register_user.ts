import { User } from "../entity/user.entity";
import { myDataSource, initializeDataSource } from "../app-data-source";

const run = async () => {
    await initializeDataSource();

    const userRepository = await myDataSource.getRepository(User);

    const existingUser = await userRepository.findOne(
        { where: { username: "hahow" }});

    if (!existingUser) {
        const user = new User();
        user.username = "hahow";
        user.password = "rocks";

        await userRepository.save(user);

    }
};

run();