// import jwt
let jwt = require("jsonwebtoken");

let TokensTimersNbrWrds = [];

// verify the difference in time between two requests 
function compareDate(date1, date2) {

    let diffEnSecondes = Math.abs(date2 - date1) / 1000;
    return diffEnSecondes;
}

// justify th text passed from a client side
function justifyText(text) {
    // remove multiple spaces and get all paragraphs of text
    let paragraphs = text.split(/\s\s+/g);

    textGeneral = "";

    paragraphs.forEach((paragraph) => {
        let begin = 0;
        let end = 79;
        let newParagraph = "";
        while (begin < paragraph.length) {

            newParagraph = newParagraph + paragraph.slice(begin, end) + "\n";
            begin = begin + 80;
            end = end + 80;
        }
        textGeneral = textGeneral + newParagraph + "." + "\n";
    });
    return textGeneral;
}
// getting text from the client side
exports.getText = (req, res, next) => {
    req.setEncoding("utf8");
    req.rawBody = "";
    req.on("data", (d) => {
        req.rawBody += d;
    });
    req.on("end", () => {
        next();
    });
};
// send a token from a user after that he send his email
exports.getTokenFromApi = (req, res) => {
    // create a token
    jwt.sign(
        { user: req.rawBody },
        "SecretKeyToto",
        { expiresIn: "360000000s" },
        (err, token) => {
            // add the user to table contains all users of our api 
            TokensTimersNbrWrds.push({
                token: token,
                date: new Date(),
                nbrWords: 0,
            });
            //send the token to the user in json format
            res.setHeader("Content-Type", "application/json");
            res.json({ token: token });
        }
    );
};
// verify authentification and the validity of the token
exports.verifyTokenValidity = (req, res, next) => {

    let authorization = req.headers["authorization"];

    if (typeof authorization !== 'undefined') {

        const bearer=authorization.split(' ')
        token=bearer[1]
        req.token = token;
        /*jwt.verify(req.token,"SecretkeyToto",(err,data)=>{
            user=data
            })*/
        // find the user in our list of users
        let user = TokensTimersNbrWrds.find(
            (element) => element.token === req.token
        );
        if (user) {
            req.user = user;
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(403);
    }
};
// verify authorizations
exports.verifyWordsAndTime = (req, res, next) => {
    // exact date includes hours, minutes, secondes of current request
    let date1 = new Date();
    // get the differnce in time betwen the current request and old request
    let duree = compareDate(date1, req.user.date);
    
    // get all words of the text
    let words = req.rawBody.split(" ");
    // delete all empty elements in our array of all words of the text
    words = words.filter((word) => word !== "");

    // if the difference between this request and the requst before is high to 1 day
    if (duree > 3600*24) {
        // update the date with an other date for the new day
        req.user.date = new Date();
        // if the text of the request body is low to 80000
        if (words.length < 80000) {
            // update the number of words with this first value of words in this day
            req.user.nbrWords = words.length;

            let textJustify = justifyText(req.rawBody);

            res.setHeader("Content-Type", "text/plain");
            res.send(textJustify);
        } else {
            //le text insérer est plus long de 80000 mots
            res.sendStatus(402);
        }
    } else {
        // in case of that the request is in the same 24 hours

        /* verify the number of words of this request to the number of words for this user in the
         same 24 hours*/
        let nbrWordsTotal = req.user.nbrWords + words.length;

    
        if (nbrWordsTotal < 80000) {
        /* add the number of words of this request to the number of words for this user in the
         same 24 hours*/
            req.user.nbrWords = req.user.nbrWords + words.length;

            let textJustify = justifyText(req.rawBody);

            res.setHeader("Content-Type", "text/plain");
            res.send(textJustify);
        } else {
            //le nombre demots depasse 80000 mots
            res.sendStatus(402);
        }
    }
};
