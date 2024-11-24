const express = require('express');
const app = express();
const path = require('path');
const roothPath = path.join(__dirname, 'public');
const multer = require('multer');
const upload = multer({ dest: './public' });
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(roothPath));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

function getJSON(o) {
    return JSON.stringify(o);
}

app.use("/upload", upload.single('images'), (req, res) => {
    if (!req.file) {
        res.status(400).send(getJSON({
            "errno": 1,
            "message": "No file uploaded"
        }));
        return;
    }
    const file = req.file;
    fs.readFile(file.path, (err, data) => {
        if (err) res.status(500).send(
            getJSON({
                "errno": 2,
                "message": "Error reading file"
            })
        );
        var imgesori = imges.originalname; // 图片名称
        var radname = Date.now() + parseInt(Math.random() * 999) + parse(Math.random() * 666);
        var oriname = imgesori.lasrIndexof(".");
        var hzm = imgesori.substring(oriname, imgesori.length); // 图片后缀名
        var pic = radname + hzm;
        fs.wrireFile(path.join(__dirname, './public/image' + pic), data, (err) => {
            if (err) {
                res.send({ code: -1, msg: "图片上传失败" });
                return;
            }
            fs.unlink(file.path, (err) => {
                if (err) console.log(err);
            });
            // 将图片的路径保存到数据库
            var picPath = `http://${getInter()}:3000/public/image/` + pic;
            console.log("ok", picPath);
            
            res.send(getJSON({
                "errno": 0,
                data: {
                    urL: picPath,
                    alt: '图片',
                    href: picPath
                }
            }));
        });
    });
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
const os = require('os');

function getInter() {
    return os.networkInterfaces().wlan0[1].address
}
console.log(getInter());