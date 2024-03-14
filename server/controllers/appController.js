import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config.js";

export async function verifyUser(req, res, next) {
  try {
    const { userName } = req.method === "GET" ? req.querry : req.body;
    let exist = await UserModel.findOne({ userName });
    if (!exist) return res.status(404).send({ error: "Can't find user" });
    next();
  } catch (error) {
    res.status(404).send({ error: " Authentication Error" });
  }
}

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
  const { userName, password } = req.body;

  try {
    UserModel.findOne({ userName })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res
                .status(400)
                .send({ error: "Password does not match." });
            } else {
              const token = jwt.sign(
                {
                  userId: user._id,
                  userName: user.userName,
                },
                env.JWT_SECRET,
                { expiresIn: "24h" }
              );
              return res.status(200).send({
                message: "Login successful...!",
                userName: user.userName,
                token,
              });
            }
          })
          .catch((error) => res.status(400).send("Don't have password"));
      })
      .catch((error) => res.status(404).send("Username not found."));
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function getUser(req, res) {
  const { userName } = req.params;
  try {
    if (!userName) return res.status(501).send({ error: "Invalid user name" });
    UserModel.findOne({ userName })
      .then((user) => {
        if (!user)
          return res.status(501).send({ error: "Couldn't find the user" });
        //remove password and send rest of the data to frontend
        const { password, ...rest } = Object.assign({}, user.toJSON());
        return res.status(201).send(rest);
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    res.status(404).send({ error: "Cannot find user data" });
  }
}

export async function updateUser(req, res) {
  try {
    // const id = req.query.id;
    const { userId } = req.user;
    console.log(userId);
    if (userId) {
      const body = req.body;
      //update user
      UserModel.updateOne({ _id: userId }, body)
        .then(() => {
          return res.status(201).send({ message: "User updated...!" });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      res.status(401).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(401).send({ error });
  }
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
