import bcrypt from "bcryptjs";
import { hashPassword, createRandomString } from "./utils.js";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Vui lòng nhập tài khoản và mật khẩu." });
        }

        const userCollection = req.app.locals.db.collection("users");

        const existingUser = await userCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Tài khoản đã tồn tại." });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await userCollection.insertOne({
            username,
            password: hashedPassword,
            createAt: new Date()
        });

        res.status(201).json({ message: "Đăng ký thành công!", userId: newUser.insertedId });
    } catch (error) {
        console.log("Lỗi đăng ký:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Vui lòng nhập tài khoản và mật khẩu." });
        }

        const userCollection = req.app.locals.db.collection("users");

        const user = await userCollection.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Tài khoản không đúng." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mật khẩu không đúng." });
        }

        const sessionId = createRandomString(32);

        const sessions = req.app.locals.db.collection("sessions");
        await sessions.insertOne({
            sessionId: sessionId,
            username: user.username,
            expire: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        return res.status(200).cookie('sessionId', sessionId).json({ message: "Đăng nhập thành công!" });

    } catch (error) {
        console.log("Lỗi đăng nhập:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const logout = async (req, res) => {
    try {
        const sessions = req.app.locals.db.collection("sessions");
        const sessionId = req.cookies.sessionId;

        await sessions.deleteOne({ sessionId: sessionId });
        res.clearCookie("sessionId");
        return res.status(200).json({ message: "Đăng xuất thành công!" });

    } catch (error) {
        console.log("Lỗi đăng xuất:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const sessions = req.app.locals.db.collection("sessions");
        const user = await sessions.findOne({ sessionId: req.cookies.sessionId }, { projection: { username: 1 } });
        const userCollection = req.app.locals.db.collection("users");
        const currentUser = await userCollection.findOne({ username: user.username }, { projection: { _id: 0, password: 0 } });
        if (!currentUser) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        return res.status(200).json(currentUser);
    } catch (error) {
        console.log("Lỗi lấy thông tin người dùng:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const sessions = req.app.locals.db.collection("sessions");
        const user = await sessions.findOne({ sessionId: req.cookies.sessionId }, { projection: { username: 1 } });
        const userCollection = req.app.locals.db.collection("users");
        const result = await userCollection.deleteOne({ username: user.username });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        await sessions.deleteOne({ sessionId: req.cookies.sessionId });
        res.clearCookie("sessionId");
        return res.status(200).json({ message: "Xóa tài khoản thành công!" });
    } catch (error) {
        console.log("Lỗi xóa tài khoản:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}