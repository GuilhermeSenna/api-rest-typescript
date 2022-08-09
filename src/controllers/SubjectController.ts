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
}