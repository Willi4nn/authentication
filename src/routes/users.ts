import bcrypt from 'bcryptjs';
import { User, Validate } from "../models/user";
import { Token } from "../models/token";
import crypto from 'crypto';
import sendEmail from "../utils/sendEmail";
import { Router } from 'express';

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { error } = Validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).send({ message: "Um usuário com este e-mail já existe." })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await new User({ username, email, password: hashedPassword }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
    console.log(url);
    await sendEmail(user.email, "Verificar Email", url);

    res.status(201).json({ id: user._id, message: "Um e-mail foi enviado para sua conta, por favor verifique" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

userRouter.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Usuário inválido" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Token inválido" });

    await User.updateOne({ _id: user._id }, { verified: true });
    await token.deleteOne();

    res.status(200).send({ message: "E-mail verificado com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Erro interno do servidor" });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await User.deleteOne({ _id: userId });

    await Token.deleteMany({ userId });

    res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default userRouter;