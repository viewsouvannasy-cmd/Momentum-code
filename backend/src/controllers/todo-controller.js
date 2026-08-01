const createGroupList = async (req, res) => {
  const user = req.user;

  res.status(200).json({ msg: user });
};

export { createGroupList };
