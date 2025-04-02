import bcrypt from "bcryptjs";

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

        const hashedPassword = await bcrypt.hash(password, 10);

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
            return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng." });
        }

        req.session.userId = user._id;
        res.status(200).json({ message: "Đăng nhập thành công!" });
    } catch (error) {
        console.log("Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}

export const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log("Lỗi đăng xuất:", err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.clearCookie("connect.sid");
            res.status(200).json({ message: "Đăng xuất thành công!" });
        });
    } catch (error) {
        console.log("Lỗi đăng xuất:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ message: "Người dùng chưa đăng nhập." });
        }

        const userCollection = req.app.locals.db.collection("users");
        const user = await userCollection.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        res.status(200).json({ username: user.username, createAt: user.createAt });
    } catch (error) {
        console.log("Lỗi lấy thông tin người dùng:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ message: "Người dùng chưa đăng nhập." });
        }

        const userCollection = req.app.locals.db.collection("users");
        const result = await userCollection.deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        req.session.destroy((err) => {
            if (err) {
                console.log("Lỗi xóa tài khoản:", err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.clearCookie("connect.sid");
            res.status(200).json({ message: "Tài khoản đã bị xóa thành công!" });
        });
    } catch (error) {
        console.log("Lỗi xóa tài khoản:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}