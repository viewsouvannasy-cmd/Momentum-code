import dns from "dns/promises";

function vaildateFormatEamil(email) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(email);
}

const checkDomainEamil = async (email) => {
  try {
    const domain = email.split("@")[1];

    if (!domain) {
      return false;
    }

    const mxRecords = await dns.resolveMx(domain);

    return mxRecords && mxRecords.length;
  } catch (error) {
    if (error.code === "ENOTFOUND" || error.code === "ENODATA") {
      return false;
    }
  }
};

export { vaildateFormatEamil, checkDomainEamil };
