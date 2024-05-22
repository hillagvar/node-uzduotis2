import http from 'http';
import fs from 'fs';


const server = http.createServer((req,res) => {
    const method = req.method;
    const url = req.url;


    if (url == "/convert-cm" && method=='POST') {

        const reqBody : any[] = [];

        req.on('data', (d) => {
            reqBody.push(d);
        });

        req.on('end', () => {
        
            const reqData = Buffer.concat(reqBody).toString();
            
            const cm = parseFloat(reqData.split('=')[1]);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            let template = fs.readFileSync("templates/result.html").toString();
            let out = template.replace("{{ result }}" , `Rezultatas: ${cm*2.54} inch`)
            res.write(out);
            res.end();
        });

        return;
    }

    if (url == "/convert-inch" && method=='POST') {

        const reqBody : any[] = [];

        req.on('data', (d) => {
            reqBody.push(d);
        });

        req.on('end', () => {
        
            const reqData = Buffer.concat(reqBody).toString();
            
            const inch = parseFloat(reqData.split('=')[1]);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            let template = fs.readFileSync("templates/result.html").toString();
            let out = template.replace("{{ result }}" , `Rezultatas: ${inch/2.54} cm`)
            res.write(out);
            res.end();
        });

        return;
    }

    if (url=='/') {
        let template = fs.readFileSync("templates/index.html").toString();

        res.write(template);
        return res.end();
    }


    res.writeHead(404, {
        "Content-Type":"text/html; charset=utf-8"
    });
   
    const template=fs.readFileSync('templates/404.html');
    res.write(template);
    return res.end();

});

server.listen(2997, 'localhost');