const authService = require("../services/auth.service");
const sendEmail = require("../config/email");
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.signupUser(name, email, password);

    res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
    res.redirect("http://127.0.0.1:5500/jul25thdiginexuswebsite-main/login.html");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // res.json({
    //   message: "Login successful",
    //   user: { id: user.id, name: user.name, email: user.email },
    //   expiresAt: Date.now() + 60 * 60 * 1000,
    // });
    res.redirect("http://127.0.0.1:5500/jul25thdiginexuswebsite-main/index.html");
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};




exports.requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await authService.generatePasswordResetToken(email);



    const resetUrl = `http://192.168.100.79:5501/reset-password.html?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 10 minutes.</p>
      `,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    await authService.resetPassword(token, password);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};


