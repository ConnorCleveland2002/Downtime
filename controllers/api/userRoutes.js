const router = require("express").Router();
const { User } = require("../../models");

//CRUD
//where are we creating the user?

//create
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers); 
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const oneUser = await User.findOne(req.params.id);
    if (!oneUser) {
      res.status(404).json({ message: 'No user found!' });
      return;
    }
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.post("/", async (req, res) => {
  try {
    const userCreate = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userCreate.id;
      req.session.logged_in = true;
    });
    res.status(200).json(userCreate);
  } catch (err) {
    res.status(400).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({ where: { email: req.body.email } });

    if (!userLogin) {
      res
        .status(400)
        .json({ message: "Please enter a correct email, or password" });
      return;
    }

    const validPassword = await userLogin.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Please enter a correct email, or password" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userLogin.id;
      req.session.logged_in = true;

      res.json({ user: userLogin, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout

router.post('/logout', (res, req) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end(); 
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;


//delete

// router.delete("/:id", (req, res) => {
//   try {
//     const deleteUser = await User.destroy(req.params.id);
//     if (!deleteUser) {
//       res.status(404).json({ message: "No user found with this id!" });
//       return;
//     }
//     res.status(200).json(deleteUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



