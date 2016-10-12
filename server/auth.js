import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import serverConfig from './config';

export default (passport) => {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: serverConfig.secretKey 
  };
  passport.use(new Strategy(opts, function(payload, done) {
    
    if(payload.id === 'putuyoga') {
      done(null, 'putuyoga');
    } else {
      done(null, false, { message: 'incorrect token' });
    }
  }));
};