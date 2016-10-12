import jwt from 'jwt-simple';
import serverConfig from '../config';

// only mock to simplify current process
// will updated later
export function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username === 'putuyoga' && password === '12345') {
        var payload = {id: 'putuyoga'};
        var token = jwt.encode(payload, serverConfig.secretKey);
        var decoded = jwt.decode(token, serverConfig.secretKey);
        // DO NOT FORGET TO ADD `JWT`
        res.json({status: true, token: 'JWT ' + token});
    } else {
        res.json({status: false});
    }
}