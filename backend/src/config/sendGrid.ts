import sgMail from "@sendgrid/mail";
import { getSendGridApiKey } from "../utils/getEnv.js";

sgMail.setApiKey(getSendGridApiKey());

export default sgMail;
