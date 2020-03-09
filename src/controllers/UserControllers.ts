import { Request, Response } from 'express';

class UserController {

    public async index(req: Request, res: Response): Promise<void> {
        res.render('index');
    };
}

export const userController = new UserController();