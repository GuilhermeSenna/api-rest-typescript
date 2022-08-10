import { Request, Response } from "express";
import { subjectRepository } from "../Repositories/subjectRepository";

export class SubjectController {
    async create(req: Request, res: Response) {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ mensagem: 'O nome é obrigatório' })
        }

        try {
            const newSubject = subjectRepository.create({ name });

            await subjectRepository.save(newSubject);

            return res.status(201).json(newSubject);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Internal Server Error' })
        }
    }

    async getSubject(req: Request, res: Response) {
        const { idSubject } = req.params;

        try {
            const subject = await subjectRepository.findOneBy({ id: Number(idSubject) });

            if (!subject) return res.status(404).json({ message: "Subject doesn't exist" });

            return res.status(201).json(subject);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async testGetSubject(req: Request, res: Response) {

        try {

            const { name, userShouldExist } = req.body;

            if (!userShouldExist)
                return res.status(404).json({ message: "Subject doesn't exist" });

            return res.status(201).json({ name });
        } catch (e) {
            console.log(e);
        }
    }
}