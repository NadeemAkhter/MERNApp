import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
  try {
    const { userName, password, profile, email } = req.body;
    //check existing user

    const userNameExist = new Promise((resolve, reject) => {
      UserModel.findOne({ userName }).then((err, user) => {
        if (err) {
          return reject(new Error(err));
        }
        if (user) {
          return reject({ error: "Please use unique username" });
        }
        resolve();
      });
    });
    //check existing email

    const emailExist = new Promise((resolve, reject) => {
      UserModel.findOne({ email }).then((err, email) => {
        if (err) {
          return reject(new Error(err));
        }
        if (email) {
          return reject({ error: "Please use unique email" });
        }
        resolve();
      });
    });

    Promise.all([userNameExist, emailExist])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashpassword) => {
              const user = new UserModel({
                userName,
                password: hashpassword,
                profile: profile || "",
                email,
              });
              user
                .save()
                .then((result) => {
                  return res
                    .status(201)
                    .send({ message: "User register successfully." });
                })
                .catch((error) => {
                  return res.status(500).send({ error });
                });
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Unable to hash password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function login(req, res) {
  res.json("Login route");
}

export async function getUser(req, res) {
  res.json("Get user route");
}

export async function updateUser(req, res) {
  res.json("Update user route");
}

export async function generateOTP(req, res) {
  res.json("Generate OTP route");
}

export async function verifyOTP(req, res) {
  res.json("Verify OTP route");
}

export async function createResetSession(req, res) {
  res.json("Create reset session route");
}

export async function resetPassword(req, res) {
  res.json("Reset password route");
}
