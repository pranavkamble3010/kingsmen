const config =  {

    backendIp :"35.202.170.211",
    backendPort:"1880",
    getUrl : function(){ return 'http://'+this.backendIp+':'+this.backendPort}
}


module.exports = config;