const conf = require('../conf')
module.exports =function (url) { 
    return '\n' + conf.head1 + 'http://' + url + '\n'+ conf.head2 + 'http://' + url
 }