const config =  {

    backendIp :"35.188.99.49",
    backendPort:"1880",
    getUrl : function(){ return 'http://'+this.backendIp+':'+this.backendPort}
}


module.exports = config;