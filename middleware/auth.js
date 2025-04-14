export async function isAuthenticated(req, res, next) {
    if (req.originalUrl === "/api/auth/login" || req.originalUrl === "/api/auth/register") {
        return next();
    }
    const sessions = req.app.locals.db.collection("sessions");
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.status(401).json({ message: "Người dùng chưa đăng nhập." });
    }

    const session = await sessions.findOne({ sessionId: sessionId });
    if (!session || session.expire < new Date()) {
        await sessions.deleteOne({ sessionId: sessionId });
        return res.status(401).json({ message: "Phiên làm việc không hợp lệ." });
    }
    next();
}