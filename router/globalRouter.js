const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
    const selectQuery = `
        SELECT score,
               content,
               createdAt
          FROM reviews
         ORDER BY content ASC;           
    `;

    try {
        db.query(selectQuery, (err, reviews) => {
            res.render("screen/home", {reviews});
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    };
});

router.post("/create", (req, res) => {
    const insertQuery = `
        INSERT  INTO   reviews (
            score,
            content,
            createdAt
        ) VALUES (
            ${req.body.score},
            "${req.body.content}",
            now()
        )
    `;

    try {
        db.query(insertQuery, (error, reviews) => {
            if(error) {
                console.log(error);
            }
            res.redirect("/");
        });
    } catch (error) {
        console.error(error);
        res.redirect("/");
    };
});

module.exports = router;