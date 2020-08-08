const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        encry_password: {
            type: String,
            required: true,
        },
        salt: String,
        role: {
            type: String,
            default: 0,
            enum: [0, 1],
        },
        bio: {
            type: String,
            trim: true,
        },
        // following: [
        //     {
        //         userId: {
        //             type: ObjectId,
        //             ref: "User",
        //         },
        //     },
        // ],
        following: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
        followers: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.methods = {
    securePassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },

    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },
};

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

module.exports = mongoose.model("User", userSchema, 'users');
