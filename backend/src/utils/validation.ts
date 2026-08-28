import bcrypt from "bcrypt";
import dns from "dns/promises";

// helper function
import { findUserById } from "./findUserById.js";

function vaildateFormatEmail(email: string): boolean {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(email);
}

const checkDomainEamil = async (email: string): Promise<boolean> => {
  try {
    const domain = email.split("@")[1];

    if (!domain) {
      return false;
    }

    const mxRecords = await dns.resolveMx(domain);

    return Boolean(mxRecords && mxRecords.length > 0);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const errCode = (error as { code?: string }).code;
      if (errCode === "ENOTFOUND" || errCode === "ENODATA") {
        return false;
      }
    }

    return false;
  }
};

const checkUserPassword = async (
  user_id: number,
  password: string,
): Promise<boolean> => {
  const findUser = await findUserById(user_id);

  // compare hash password
  return await bcrypt.compare(password, findUser[0].user_password);
};

function isValidOtp(otp: string): boolean {
  const length = 6;
  const otpRegex = new RegExp(`^\\d{${length}}$`);
  return otpRegex.test(otp);
}

export { vaildateFormatEmail, checkDomainEamil, checkUserPassword, isValidOtp };
